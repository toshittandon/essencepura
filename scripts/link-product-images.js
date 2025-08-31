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

// Configuration for image mapping
const IMAGE_BASE_URL = '/Products'; // Relative to public folder
const AVAILABLE_IMAGES = Array.from({ length: 26 }, (_, i) => `${i + 1}.png`);

async function listProducts() {
  try {
    console.log('📦 Fetching products from Appwrite...\n');
    
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID
    );
    
    console.log(`Found ${response.documents.length} products:\n`);
    
    response.documents.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product.$id}`);
      console.log(`   Current Image: ${product.image || product.imageUrl || 'None'}`);
      console.log(`   Category: ${product.category || 'Unknown'}`);
      console.log('');
    });
    
    return response.documents;
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    return [];
  }
}

async function updateProductImage(productId, imageUrl, imageNumber) {
  try {
    const result = await databases.updateDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      productId,
      {
        image: imageUrl,
        imageUrl: imageUrl, // For compatibility
        imageNumber: imageNumber // Store the image number for reference
      }
    );
    
    console.log(`✅ Updated product ${productId} with image ${imageUrl}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
    return null;
  }
}

async function linkProductToImage(productId, imageNumber) {
  const imageUrl = `${IMAGE_BASE_URL}/${imageNumber}.png`;
  
  if (!AVAILABLE_IMAGES.includes(`${imageNumber}.png`)) {
    console.error(`❌ Image ${imageNumber}.png does not exist in /public/Products/`);
    return false;
  }
  
  console.log(`🔗 Linking product ${productId} to image ${imageUrl}...`);
  const result = await updateProductImage(productId, imageUrl, imageNumber);
  return result !== null;
}

async function autoLinkImages() {
  console.log('🤖 Starting automatic image linking...\n');
  
  const products = await listProducts();
  if (products.length === 0) {
    console.log('No products found to link images to.');
    return;
  }
  
  console.log('Available images:');
  AVAILABLE_IMAGES.forEach((img, index) => {
    console.log(`  ${index + 1}. ${img}`);
  });
  console.log('');
  
  // Auto-assign images based on product index
  const successfulLinks = [];
  
  for (let i = 0; i < products.length && i < AVAILABLE_IMAGES.length; i++) {
    const product = products[i];
    const imageNumber = i + 1;
    
    console.log(`🎯 Auto-linking "${product.name}" to ${imageNumber}.png`);
    
    const success = await linkProductToImage(product.$id, imageNumber);
    if (success) {
      successfulLinks.push({
        productName: product.name,
        productId: product.$id,
        imageNumber: imageNumber
      });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n🎉 Successfully linked ${successfulLinks.length} products to images:`);
  successfulLinks.forEach(link => {
    console.log(`  ✅ ${link.productName} → ${link.imageNumber}.png`);
  });
  
  if (products.length > AVAILABLE_IMAGES.length) {
    console.log(`\n⚠️  Note: ${products.length - AVAILABLE_IMAGES.length} products couldn't be linked (not enough images)`);
  }
}

async function linkSpecificProduct(productId, imageNumber) {
  console.log(`🎯 Linking specific product ${productId} to image ${imageNumber}.png\n`);
  
  const success = await linkProductToImage(productId, imageNumber);
  if (success) {
    console.log(`\n✅ Product successfully linked to image ${imageNumber}.png`);
  } else {
    console.log(`\n❌ Failed to link product to image`);
  }
}

async function removeImageLinks() {
  console.log('🧹 Removing all image links from products...\n');
  
  const products = await listProducts();
  let removedCount = 0;
  
  for (const product of products) {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        product.$id,
        {
          image: null,
          imageUrl: null,
          imageNumber: null
        }
      );
      
      console.log(`✅ Removed image link from "${product.name}"`);
      removedCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`❌ Failed to remove image from "${product.name}":`, error.message);
    }
  }
  
  console.log(`\n🎉 Removed image links from ${removedCount} products`);
}

async function showImageMapping() {
  console.log('🗺️  Current Image Mapping:\n');
  
  const products = await listProducts();
  
  console.log('Products with images:');
  const withImages = products.filter(p => p.image || p.imageUrl);
  withImages.forEach(product => {
    const imageUrl = product.image || product.imageUrl;
    const imageNumber = product.imageNumber || 'Unknown';
    console.log(`  ✅ ${product.name} → ${imageUrl} (Image #${imageNumber})`);
  });
  
  console.log('\nProducts without images:');
  const withoutImages = products.filter(p => !p.image && !p.imageUrl);
  withoutImages.forEach(product => {
    console.log(`  ❌ ${product.name}`);
  });
  
  console.log(`\nSummary: ${withImages.length} with images, ${withoutImages.length} without images`);
}

// CLI Interface
async function runCLI() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log('🖼️  Product Image Linker');
  console.log('========================\n');
  
  switch (command) {
    case 'list':
      await listProducts();
      break;
      
    case 'auto-link':
      await autoLinkImages();
      break;
      
    case 'link':
      if (args[1] && args[2]) {
        const productId = args[1];
        const imageNumber = parseInt(args[2]);
        if (imageNumber >= 1 && imageNumber <= 26) {
          await linkSpecificProduct(productId, imageNumber);
        } else {
          console.log('❌ Image number must be between 1 and 26');
        }
      } else {
        console.log('Usage: node scripts/link-product-images.js link <product-id> <image-number>');
      }
      break;
      
    case 'remove-all':
      await removeImageLinks();
      break;
      
    case 'mapping':
      await showImageMapping();
      break;
      
    default:
      console.log('Available commands:');
      console.log('  list           - List all products');
      console.log('  auto-link      - Automatically link products to images (1.png, 2.png, etc.)');
      console.log('  link <id> <num> - Link specific product to specific image number');
      console.log('  mapping        - Show current image mapping');
      console.log('  remove-all     - Remove all image links from products');
      console.log('');
      console.log('Examples:');
      console.log('  node scripts/link-product-images.js list');
      console.log('  node scripts/link-product-images.js auto-link');
      console.log('  node scripts/link-product-images.js link 507f1f77bcf86cd799439011 5');
      console.log('  node scripts/link-product-images.js mapping');
      console.log('');
      console.log('💡 The auto-link command will assign images sequentially:');
      console.log('   First product → 1.png, Second product → 2.png, etc.');
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

runCLI().catch(console.error);
