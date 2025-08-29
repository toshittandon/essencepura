/**
 * Product Migration Script
 * 
 * This script helps migrate existing product data from the local products.js file
 * to your Appwrite database. Run this once after setting up your Appwrite project.
 * 
 * Usage:
 * 1. Make sure your Appwrite project is set up with the products collection
 * 2. Update your .env file with correct Appwrite credentials
 * 3. Run: node scripts/migrate-products.js
 */

import { Client, Databases, ID } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Sample product data (based on your existing products.js)
const sampleProducts = [
  {
    name: "Gentle Cleansing Oil",
    price: 48,
    originalPrice: 55,
    category: "Cleansers",
    description: "A luxurious blend of organic plant oils that gently removes makeup and impurities while nourishing your skin.",
    ingredients: ["Jojoba Oil", "Rosehip Oil", "Chamomile Extract", "Vitamin E"],
    benefits: ["Deep cleansing", "Hydrating", "Anti-inflammatory"],
    isBestseller: true,
    isNew: false,
    stock: 25,
    image: "/uploads/cleansing-oil.jpg" // You'll need to upload actual images
  },
  {
    name: "Botanical Face Serum",
    price: 72,
    category: "Serums",
    description: "Concentrated botanical extracts deliver powerful antioxidants and vitamins for radiant, youthful skin.",
    ingredients: ["Hyaluronic Acid", "Vitamin C", "Green Tea Extract", "Aloe Vera"],
    benefits: ["Anti-aging", "Brightening", "Firming"],
    isNew: true,
    isBestseller: false,
    stock: 30,
    image: "/uploads/face-serum.jpg"
  },
  {
    name: "Nourishing Night Cream",
    price: 65,
    category: "Moisturizers",
    description: "Rich, restorative cream works overnight to repair and rejuvenate your skin with organic botanicals.",
    ingredients: ["Shea Butter", "Peptides", "Lavender Oil", "Ceramides"],
    benefits: ["Deep hydration", "Overnight repair", "Calming"],
    isBestseller: true,
    isNew: false,
    stock: 20,
    image: "/uploads/night-cream.jpg"
  },
  {
    name: "Illuminating Eye Cream",
    price: 56,
    category: "Eye Care",
    description: "Delicate formula reduces puffiness and dark circles while firming the eye area with natural actives.",
    ingredients: ["Caffeine", "Retinol", "Cucumber Extract", "Collagen"],
    benefits: ["Reduces puffiness", "Firms skin", "Brightens"],
    isNew: true,
    isBestseller: false,
    stock: 15,
    image: "/uploads/eye-cream.jpg"
  },
  {
    name: "Purifying Clay Mask",
    price: 42,
    category: "Masks",
    description: "Weekly treatment with mineral-rich clay draws out impurities while botanical extracts soothe and balance.",
    ingredients: ["Bentonite Clay", "Tea Tree Oil", "Calendula", "Zinc Oxide"],
    benefits: ["Detoxifying", "Pore minimizing", "Balancing"],
    isBestseller: false,
    isNew: false,
    stock: 35,
    image: "/uploads/clay-mask.jpg"
  },
  {
    name: "Hydrating Toner Mist",
    price: 38,
    category: "Toners",
    description: "Refreshing mist infused with organic florals and minerals to prep and hydrate your skin.",
    ingredients: ["Rose Water", "Hyaluronic Acid", "Glycerin", "Botanical Extracts"],
    benefits: ["Hydrating", "pH balancing", "Refreshing"],
    isBestseller: true,
    isNew: false,
    stock: 40,
    image: "/uploads/toner-mist.jpg"
  }
];

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '');

const databases = new Databases(client);

// Configuration
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';
const PRODUCTS_COLLECTION_ID = process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID || '';

async function migrateProducts() {
  console.log('🚀 Starting product migration...');
  
  // Validate environment variables
  if (!DATABASE_ID || !PRODUCTS_COLLECTION_ID) {
    console.error('❌ Missing required environment variables:');
    console.error('   - VITE_APPWRITE_DATABASE_ID');
    console.error('   - VITE_APPWRITE_PRODUCTS_COLLECTION_ID');
    console.error('Please check your .env file.');
    process.exit(1);
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const product of sampleProducts) {
    try {
      console.log(`📦 Creating product: ${product.name}`);
      
      const result = await databases.createDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        ID.unique(),
        product
      );
      
      console.log(`✅ Created: ${product.name} (ID: ${result.$id})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to create ${product.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n📊 Migration Summary:');
  console.log(`✅ Successfully created: ${successCount} products`);
  console.log(`❌ Failed: ${errorCount} products`);
  
  if (errorCount > 0) {
    console.log('\n🔍 Common issues:');
    console.log('   - Check your collection attributes match the product schema');
    console.log('   - Verify collection permissions allow document creation');
    console.log('   - Ensure your Appwrite project is properly configured');
  }
  
  console.log('\n🎉 Migration completed!');
}

// Handle script execution
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProducts().catch(error => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
}

export { migrateProducts, sampleProducts };