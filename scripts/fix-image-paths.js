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

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID;
const PRODUCTS_COLLECTION_ID = process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;

async function fixImagePaths() {
  try {
    console.log('🔧 Fixing image paths to use /Products/ prefix...\n');
    
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID
    );
    
    let fixedCount = 0;
    
    for (const product of response.documents) {
      const currentImage = product.image;
      
      // Check if image path needs fixing (starts with / but not /Products/)
      if (currentImage && currentImage.startsWith('/') && !currentImage.startsWith('/Products/')) {
        // Extract the filename (like "1.png" from "/1.png")
        const filename = currentImage.substring(1); // Remove leading /
        
        // Create correct path
        const correctPath = `/Products/${filename}`;
        
        // Extract image number for the imageNumber field
        const imageNumber = filename.replace('.png', '');
        
        console.log(`🔄 Fixing: "${product.name}"`);
        console.log(`   From: ${currentImage}`);
        console.log(`   To: ${correctPath}`);
        
        try {
          await databases.updateDocument(
            DATABASE_ID,
            PRODUCTS_COLLECTION_ID,
            product.$id,
            {
              image: correctPath,
              imageUrl: correctPath // For compatibility
            }
          );
          
          fixedCount++;
          console.log(`   ✅ Fixed!\n`);
          
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 300));
          
        } catch (error) {
          console.error(`   ❌ Failed to update ${product.name}:`, error.message);
        }
      } else if (currentImage) {
        console.log(`✅ "${product.name}" already has correct path: ${currentImage}`);
      } else {
        console.log(`⚠️  "${product.name}" has no image assigned`);
      }
    }
    
    console.log(`\n🎉 Fixed ${fixedCount} product image paths!`);
    
    if (fixedCount > 0) {
      console.log('\n💡 Your products now use the correct /Products/ image paths.');
      console.log('   The images should load properly in your application.');
    }
    
  } catch (error) {
    console.error('❌ Error fixing image paths:', error.message);
  }
}

// Check environment variables
if (!process.env.VITE_APPWRITE_PROJECT_ID || !process.env.VITE_APPWRITE_DATABASE_ID) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_APPWRITE_PROJECT_ID');
  console.error('   VITE_APPWRITE_DATABASE_ID');
  console.error('   VITE_APPWRITE_PRODUCTS_COLLECTION_ID');
  console.error('   APPWRITE_API_KEY');
  console.error('');
  console.error('Please check your .env file.');
  process.exit(1);
}

fixImagePaths().catch(console.error);
