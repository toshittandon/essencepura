#!/usr/bin/env node

import { Client, Databases, Storage, ID } from 'node-appwrite';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const client = new Client();
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID;
const PRODUCTS_COLLECTION_ID = process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;
const STORAGE_BUCKET_ID = process.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'products-images';

// Helper function to generate file URL
function getFileUrl(fileId) {
  return `${process.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.VITE_APPWRITE_PROJECT_ID}`;
}

// Upload image to bucket
async function uploadImage(imagePath, fileName) {
  try {
    console.log(`📤 Uploading ${fileName}...`);
    
    const fileBuffer = fs.readFileSync(imagePath);
    const file = await storage.createFile(
      STORAGE_BUCKET_ID,
      ID.unique(),
      fileBuffer,
      fileName
    );
    
    const fileUrl = getFileUrl(file.$id);
    console.log(`✅ Uploaded: ${fileName} (ID: ${file.$id})`);
    console.log(`🔗 URL: ${fileUrl}`);
    
    return {
      fileId: file.$id,
      fileUrl: fileUrl,
      fileName: fileName
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    return null;
  }
}

// Update product with image
async function updateProductImage(productId, imageFileId, imageUrl) {
  try {
    const result = await databases.updateDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      productId,
      {
        imageFileId: imageFileId,
        imageUrl: imageUrl,
        image: imageUrl // Keep backward compatibility
      }
    );
    
    console.log(`✅ Updated product ${productId} with image`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
    return null;
  }
}

// List all products
async function listProducts() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID
    );
    
    console.log('\n📦 Current Products:');
    response.documents.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product.$id})`);
      if (product.imageFileId) {
        console.log(`   🖼️  Image: ${product.imageFileId}`);
      } else {
        console.log(`   ❌ No image attached`);
      }
    });
    
    return response.documents;
  } catch (error) {
    console.error('❌ Failed to list products:', error.message);
    return [];
  }
}

// List files in bucket
async function listBucketFiles() {
  try {
    const response = await storage.listFiles(STORAGE_BUCKET_ID);
    
    console.log('\n🗂️  Files in Products bucket:');
    response.files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name} (ID: ${file.$id})`);
      console.log(`   🔗 URL: ${getFileUrl(file.$id)}`);
    });
    
    return response.files;
  } catch (error) {
    console.error('❌ Failed to list bucket files:', error.message);
    return [];
  }
}

// Bulk upload images from a directory
async function bulkUploadImages(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );
    
    console.log(`📁 Found ${imageFiles.length} image files in ${directoryPath}`);
    
    const uploadResults = [];
    
    for (const fileName of imageFiles) {
      const filePath = path.join(directoryPath, fileName);
      const result = await uploadImage(filePath, fileName);
      if (result) {
        uploadResults.push(result);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`\n✅ Uploaded ${uploadResults.length} images successfully`);
    return uploadResults;
    
  } catch (error) {
    console.error('❌ Bulk upload failed:', error.message);
    return [];
  }
}

// Interactive CLI
async function runInteractiveCLI() {
  console.log('🎨 Product Image Manager');
  console.log('========================\n');
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'list-products':
      await listProducts();
      break;
      
    case 'list-files':
      await listBucketFiles();
      break;
      
    case 'upload':
      if (args[1]) {
        const imagePath = args[1];
        const fileName = args[2] || path.basename(imagePath);
        await uploadImage(imagePath, fileName);
      } else {
        console.log('Usage: node scripts/manage-product-images.js upload <image-path> [filename]');
      }
      break;
      
    case 'bulk-upload':
      if (args[1]) {
        await bulkUploadImages(args[1]);
      } else {
        console.log('Usage: node scripts/manage-product-images.js bulk-upload <directory-path>');
      }
      break;
      
    case 'update-product':
      if (args[1] && args[2]) {
        const productId = args[1];
        const imageFileId = args[2];
        const imageUrl = getFileUrl(imageFileId);
        await updateProductImage(productId, imageFileId, imageUrl);
      } else {
        console.log('Usage: node scripts/manage-product-images.js update-product <product-id> <image-file-id>');
      }
      break;
      
    default:
      console.log('Available commands:');
      console.log('  list-products     - List all products');
      console.log('  list-files        - List all files in bucket');
      console.log('  upload <path>     - Upload single image');
      console.log('  bulk-upload <dir> - Upload all images from directory');
      console.log('  update-product <product-id> <file-id> - Link image to product');
      console.log('\nExamples:');
      console.log('  node scripts/manage-product-images.js list-products');
      console.log('  node scripts/manage-product-images.js upload ./public/products/cleanser.jpg');
      console.log('  node scripts/manage-product-images.js bulk-upload ./public/products/');
  }
}

runInteractiveCLI().catch(console.error);