#!/usr/bin/env node

import { Client, Databases } from 'node-appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

async function setupCollectionAttributes() {
  try {
    console.log('🚀 Setting up Products collection attributes...');

    const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID;
    const PRODUCTS_COLLECTION_ID = process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;

    if (!DATABASE_ID || !PRODUCTS_COLLECTION_ID) {
      console.log('❌ Missing required environment variables:');
      console.log('   - VITE_APPWRITE_DATABASE_ID');
      console.log('   - VITE_APPWRITE_PRODUCTS_COLLECTION_ID');
      return;
    }

    // Add imageFileId attribute for bucket integration
    console.log('📝 Adding imageFileId attribute...');
    try {
      await databases.createStringAttribute(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        'imageFileId',
        255,
        false // not required to maintain compatibility
      );
      console.log('✅ Added imageFileId attribute');
      
      // Wait for attribute to be available
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      if (error.code === 409) {
        console.log('✅ imageFileId attribute already exists');
      } else {
        console.error('❌ Error with imageFileId attribute:', error.message);
      }
    }

    // Add imageUrl attribute for direct file access
    console.log('📝 Adding imageUrl attribute...');
    try {
      await databases.createUrlAttribute(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        'imageUrl',
        false // not required
      );
      console.log('✅ Added imageUrl attribute');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      if (error.code === 409) {
        console.log('✅ imageUrl attribute already exists');
      } else {
        console.error('❌ Error with imageUrl attribute:', error.message);
      }
    }

    console.log('\n🎉 Collection setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Create storage bucket manually in Appwrite Console');
    console.log('2. Upload images to the bucket');
    console.log('3. Update product documents with file IDs');
    
    console.log('\n🔧 Manual bucket creation:');
    console.log('1. Go to Appwrite Console > Storage');
    console.log('2. Click "Create Bucket"');
    console.log('3. Name: "Products Images"');
    console.log(`4. Bucket ID: ${process.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'products-images'}`);
    console.log('5. Enable public read permissions');
    console.log('6. Set allowed file extensions: jpg, jpeg, png, gif, webp, svg');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

setupCollectionAttributes();