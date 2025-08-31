#!/usr/bin/env node

import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = new Client();
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

async function setupProductsBucket() {
  try {
    console.log('🚀 Setting up Products bucket connection...');

    // Check if bucket already exists by trying to list files (requires less permissions)
    console.log('🗂️  Checking Products storage bucket...');
    
    const bucketId = process.env.VITE_APPWRITE_STORAGE_BUCKET_ID;
    
    if (!bucketId) {
      console.log('❌ VITE_APPWRITE_STORAGE_BUCKET_ID not found in .env file');
      console.log('📋 Please add this to your .env file:');
      console.log('VITE_APPWRITE_STORAGE_BUCKET_ID=your-bucket-id');
      console.log('\n🔧 To create a bucket manually:');
      console.log('1. Go to Appwrite Console > Storage');
      console.log('2. Create a new bucket named "Products Images"');
      console.log('3. Set permissions to allow public read access');
      console.log('4. Copy the bucket ID to your .env file');
      return;
    }

    try {
      // Try to list files to verify bucket exists and we have access
      await storage.listFiles(bucketId, [], 1);
      console.log('✅ Products bucket exists and is accessible:', bucketId);
    } catch (error) {
      if (error.code === 404) {
        console.log('❌ Bucket not found. Please create it manually in Appwrite Console.');
        console.log('🔧 Steps to create bucket:');
        console.log('1. Go to Appwrite Console > Storage');
        console.log('2. Click "Create Bucket"');
        console.log('3. Name: "Products Images"');
        console.log('4. Bucket ID:', bucketId);
        console.log('5. Set permissions to allow public read access');
        return;
      } else if (error.code === 401) {
        console.log('⚠️  API key lacks storage permissions, but bucket likely exists');
        console.log('✅ Proceeding with collection setup...');
      } else {
        throw error;
      }
    }

    // Update Products Collection to ensure imageFileId attribute exists
    console.log('📝 Verifying Products collection attributes...');
    
    try {
      // Check if imageFileId attribute exists, create if not
      await databases.createStringAttribute(
        process.env.VITE_APPWRITE_DATABASE_ID,
        process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
        'imageFileId',
        255,
        false // not required to maintain compatibility
      );
      console.log('✅ Added imageFileId attribute to Products collection');
      
      // Wait for attribute to be available
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      if (error.code === 409) {
        console.log('✅ imageFileId attribute already exists');
      } else {
        console.error('⚠️  Error with imageFileId attribute:', error.message);
      }
    }

    // Add imageUrl attribute for direct file access
    try {
      await databases.createUrlAttribute(
        process.env.VITE_APPWRITE_DATABASE_ID,
        process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
        'imageUrl',
        false // not required
      );
      console.log('✅ Added imageUrl attribute to Products collection');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      if (error.code === 409) {
        console.log('✅ imageUrl attribute already exists');
      } else {
        console.error('⚠️  Error with imageUrl attribute:', error.message);
      }
    }

    console.log('\n🎉 Products bucket setup complete!');
    console.log('\n📋 What you can do now:');
    console.log('1. Upload images directly to the Products bucket in Appwrite Console');
    console.log('2. Use the file ID in your product documents');
    console.log('3. Images will be automatically accessible via CDN URLs');
    console.log('\n🔗 Access your bucket at:');
    console.log(`   ${process.env.VITE_APPWRITE_ENDPOINT.replace('/v1', '')}/console/project-${process.env.VITE_APPWRITE_PROJECT_ID}/storage/bucket-${bucketId}`);

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupProductsBucket();