#!/usr/bin/env node

/**
 * Appwrite Collection Setup Script
 * This script creates the orders collection with all required attributes
 */

const { Client, Databases, ID } = require('node-appwrite');
require('dotenv').config();

// Initialize Appwrite client
const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY); // You'll need to add this to your .env

async function createOrdersCollection() {
  try {
    console.log('🚀 Creating orders collection...');
    
    const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
    const collectionId = process.env.VITE_APPWRITE_ORDERS_COLLECTION_ID || 'orders';
    
    // Create the collection
    const collection = await databases.createCollection(
      databaseId,
      collectionId,
      'orders',
      [], // permissions - we'll set these after creating attributes
      true // documentSecurity
    );
    
    console.log('✅ Collection created:', collection.name);
    
    // Create attributes
    const attributes = [
      {
        key: 'userId',
        type: 'string',
        size: 255,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'items',
        type: 'string',
        size: 10000,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'subtotal',
        type: 'double',
        required: true,
        default: null,
        array: false
      },
      {
        key: 'tax',
        type: 'double',
        required: true,
        default: null,
        array: false
      },
      {
        key: 'total',
        type: 'double',
        required: true,
        default: null,
        array: false
      },
      {
        key: 'shippingAddress',
        type: 'string',
        size: 2000,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'paymentIntentId',
        type: 'string',
        size: 255,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'status',
        type: 'string',
        size: 50,
        required: true,
        default: 'pending',
        array: false
      },
      {
        key: 'customPackagingName',
        type: 'string',
        size: 30,
        required: false, // This is optional
        default: null,
        array: false
      },
      {
        key: 'createdAt',
        type: 'string',
        size: 255,
        required: true,
        default: null,
        array: false
      },
      {
        key: 'updatedAt',
        type: 'string',
        size: 255,
        required: true,
        default: null,
        array: false
      }
    ];
    
    console.log('📝 Creating attributes...');
    
    for (const attr of attributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
            attr.array
          );
        } else if (attr.type === 'double') {
          await databases.createFloatAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.required,
            null, // min
            null, // max
            attr.default,
            attr.array
          );
        }
        
        console.log(`  ✅ Created attribute: ${attr.key}`);
        
        // Wait a bit between attribute creation to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ⚠️  Attribute ${attr.key} already exists`);
        } else {
          console.error(`  ❌ Error creating attribute ${attr.key}:`, error.message);
        }
      }
    }
    
    console.log('🔐 Setting up permissions...');
    
    // Update collection permissions
    try {
      await databases.updateCollection(
        databaseId,
        collectionId,
        'orders',
        [
          'create("users")', // Authenticated users can create orders
          'read("users")',   // Users can read their own orders (document-level security)
          'update("admins")', // Only admins can update orders
          'delete("admins")'  // Only admins can delete orders
        ],
        true // documentSecurity
      );
      console.log('  ✅ Permissions set successfully');
    } catch (error) {
      console.error('  ❌ Error setting permissions:', error.message);
    }
    
    console.log('🎯 Creating indexes for better performance...');
    
    // Create indexes
    const indexes = [
      {
        key: 'userId_createdAt',
        type: 'key',
        attributes: ['userId', 'createdAt'],
        orders: ['ASC', 'DESC']
      },
      {
        key: 'status',
        type: 'key',
        attributes: ['status'],
        orders: ['ASC']
      },
      {
        key: 'paymentIntentId',
        type: 'unique',
        attributes: ['paymentIntentId'],
        orders: ['ASC']
      }
    ];
    
    for (const index of indexes) {
      try {
        await databases.createIndex(
          databaseId,
          collectionId,
          index.key,
          index.type,
          index.attributes,
          index.orders
        );
        console.log(`  ✅ Created index: ${index.key}`);
        
        // Wait between index creation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ⚠️  Index ${index.key} already exists`);
        } else {
          console.error(`  ❌ Error creating index ${index.key}:`, error.message);
        }
      }
    }
    
    console.log('\n🎉 Orders collection setup complete!');
    console.log('\n📋 Summary:');
    console.log(`   Collection ID: ${collectionId}`);
    console.log(`   Database ID: ${databaseId}`);
    console.log('   Attributes: 11 total (including customPackagingName)');
    console.log('   Indexes: 3 for optimal performance');
    console.log('   Permissions: Users can create/read, Admins can update/delete');
    
  } catch (error) {
    console.error('❌ Error creating collection:', error);
    
    if (error.code === 409) {
      console.log('\n⚠️  Collection already exists. Trying to add missing attributes...');
      
      // Try to add just the customPackagingName attribute if collection exists
      try {
        const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
        const collectionId = process.env.VITE_APPWRITE_ORDERS_COLLECTION_ID || 'orders';
        
        await databases.createStringAttribute(
          databaseId,
          collectionId,
          'customPackagingName',
          30,
          false, // not required
          null,
          false
        );
        
        console.log('✅ Added customPackagingName attribute to existing collection');
        
      } catch (attrError) {
        if (attrError.code === 409) {
          console.log('✅ customPackagingName attribute already exists');
        } else {
          console.error('❌ Error adding customPackagingName attribute:', attrError.message);
        }
      }
    }
  }
}

// Run the setup
if (require.main === module) {
  createOrdersCollection()
    .then(() => {
      console.log('\n🚀 Setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Setup failed:', error);
      process.exit(1);
    });
}

module.exports = { createOrdersCollection };