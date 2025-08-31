#!/usr/bin/env node

import { Client, Databases, ID } from 'node-appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Appwrite client for server-side operations
const client = new Client();
client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

// Product data to upload - properly formatted for Appwrite
const productsToUpload = [
  {
    name: "Vitamin C Brightening Cleanser",
    price: 52,
    originalPrice: 58,
    image: "/Pura.png",
    category: "Cleansers",
    description: "Energizing gel cleanser with vitamin C and citrus extracts to brighten and refresh your complexion.",
    ingredients: ["Vitamin C", "Orange Extract", "Glycolic Acid", "Aloe Vera"],
    benefits: ["Brightening", "Gentle exfoliation", "Antioxidant protection"],
    isNew: true,
    isBestseller: false,
    stock: 25
  },
  {
    name: "Retinol Renewal Serum",
    price: 89,
    image: "/Pura.png",
    category: "Serums", 
    description: "Advanced anti-aging serum with encapsulated retinol for smoother, firmer skin with minimal irritation.",
    ingredients: ["Encapsulated Retinol", "Niacinamide", "Squalane", "Peptides"],
    benefits: ["Anti-aging", "Texture improvement", "Collagen boost"],
    isBestseller: true,
    isNew: false,
    stock: 30
  },
  {
    name: "Hydrating Day Moisturizer SPF 30",
    price: 68,
    image: "/Pura.png",
    category: "Moisturizers",
    description: "Lightweight daily moisturizer with broad-spectrum SPF protection and hydrating botanicals.",
    ingredients: ["Zinc Oxide", "Hyaluronic Acid", "Green Tea", "Ceramides"],
    benefits: ["Sun protection", "Daily hydration", "Antioxidant defense"],
    isNew: false,
    isBestseller: false,
    stock: 20
  },
  {
    name: "Peptide Eye Renewal Complex",
    price: 78,
    originalPrice: 85,
    image: "/Pura.png",
    category: "Eye Care",
    description: "Intensive eye treatment with peptides and botanical extracts to target fine lines and crow's feet.",
    ingredients: ["Matrixyl 3000", "Argireline", "Vitamin K", "Arnica"],
    benefits: ["Reduces fine lines", "Improves elasticity", "Reduces dark circles"],
    isBestseller: true,
    isNew: false,
    stock: 15
  },
  {
    name: "Exfoliating Enzyme Mask",
    price: 58,
    image: "/Pura.png",
    category: "Masks",
    description: "Gentle fruit enzyme mask that naturally exfoliates and brightens without harsh scrubbing.",
    ingredients: ["Papaya Enzyme", "Pineapple Extract", "Honey", "Oat Extract"],
    benefits: ["Gentle exfoliation", "Brightening", "Smoothing"],
    isNew: true,
    isBestseller: false,
    stock: 35
  },
  {
    name: "Balancing Witch Hazel Toner",
    price: 35,
    image: "/Pura.png",
    category: "Toners",
    description: "Alcohol-free toner with witch hazel and botanical extracts to minimize pores and balance skin.",
    ingredients: ["Witch Hazel", "Niacinamide", "Chamomile", "Rose Hip Extract"],
    benefits: ["Pore minimizing", "Oil control", "Soothing"],
    isNew: false,
    isBestseller: false,
    stock: 40
  },
  {
    name: "Nourishing Hair Oil Treatment",
    price: 45,
    image: "/Pura.png",
    category: "Hair",
    description: "Luxurious blend of organic oils to deeply nourish and restore shine to dry, damaged hair.",
    ingredients: ["Argan Oil", "Coconut Oil", "Jojoba Oil", "Rosemary Extract"],
    benefits: ["Deep conditioning", "Shine enhancement", "Scalp nourishment"],
    isNew: false,
    isBestseller: false,
    stock: 25
  },
  {
    name: "Strengthening Hair Mask",
    price: 62,
    originalPrice: 70,
    image: "/Pura.png",
    category: "Hair",
    description: "Weekly intensive treatment mask with proteins and botanicals to repair and strengthen hair.",
    ingredients: ["Keratin", "Biotin", "Avocado Oil", "Silk Proteins"],
    benefits: ["Hair strengthening", "Damage repair", "Moisture restoration"],
    isBestseller: true,
    isNew: false,
    stock: 20
  },
  {
    name: "Revitalizing Body Lotion",
    price: 48,
    image: "/Pura.png",
    category: "Body",
    description: "Fast-absorbing body lotion with organic botanicals and vitamins for soft, smooth skin.",
    ingredients: ["Shea Butter", "Vitamin E", "Lavender Oil", "Cocoa Butter"],
    benefits: ["Long-lasting hydration", "Skin softening", "Aromatherapy"],
    isNew: false,
    isBestseller: false,
    stock: 30
  },
  {
    name: "Exfoliating Body Scrub",
    price: 42,
    image: "/Pura.png",
    category: "Body",
    description: "Invigorating sugar scrub with essential oils to buff away dead skin and reveal radiant skin.",
    ingredients: ["Brown Sugar", "Sweet Almond Oil", "Vanilla Extract", "Sea Salt"],
    benefits: ["Gentle exfoliation", "Skin smoothing", "Circulation boost"],
    isNew: true,
    isBestseller: false,
    stock: 35
  },
  {
    name: "Essential Skincare Gift Set",
    price: 125,
    originalPrice: 150,
    image: "/Pura.png",
    category: "Gift Sets",
    description: "Complete skincare routine featuring our bestselling cleanser, serum, and moisturizer.",
    ingredients: ["Multiple products included"],
    benefits: ["Complete routine", "Perfect for gifting", "Value savings"],
    isBestseller: true,
    isNew: false,
    stock: 10
  },
  {
    name: "Luxury Spa Collection",
    price: 189,
    originalPrice: 220,
    image: "/Pura.png",
    category: "Gift Sets",
    description: "Premium collection of our most luxurious treatments for the ultimate at-home spa experience.",
    ingredients: ["Multiple premium products"],
    benefits: ["Spa experience", "Luxury formulations", "Complete pampering"],
    isNew: false,
    isBestseller: false,
    stock: 5
  },
  {
    name: "Gentle Micellar Water",
    price: 32,
    image: "/Pura.png",
    category: "Cleansers",
    description: "No-rinse micellar water that gently removes makeup and impurities without stripping the skin.",
    ingredients: ["Micellar Technology", "Rose Water", "Cucumber Extract", "Panthenol"],
    benefits: ["Gentle cleansing", "No-rinse formula", "Suitable for sensitive skin"],
    isNew: false,
    isBestseller: false,
    stock: 45
  },
  {
    name: "Overnight Repair Serum",
    price: 95,
    image: "/Pura.png",
    category: "Serums",
    description: "Potent nighttime serum with growth factors and peptides for intensive skin renewal while you sleep.",
    ingredients: ["Growth Factors", "Copper Peptides", "Bakuchiol", "Squalane"],
    benefits: ["Overnight repair", "Skin renewal", "Anti-aging"],
    isNew: true,
    isBestseller: false,
    stock: 20
  }
];

async function uploadProducts() {
  console.log('🚀 Starting product upload to Appwrite...');
  console.log(`📊 Total products to upload: ${productsToUpload.length}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const product of productsToUpload) {
    try {
      const result = await databases.createDocument(
        process.env.VITE_APPWRITE_DATABASE_ID,
        process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
        ID.unique(),
        product
      );
      
      console.log(`✅ Uploaded: ${product.name} (ID: ${result.$id})`);
      successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Failed to upload ${product.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n📈 Upload Summary:');
  console.log(`✅ Successfully uploaded: ${successCount} products`);
  console.log(`❌ Failed uploads: ${errorCount} products`);
  
  if (successCount > 0) {
    console.log('\n🎉 Products are now available in your Appwrite console!');
    console.log(`🔗 Check them at: ${process.env.VITE_APPWRITE_ENDPOINT.replace('/v1', '')}/console/project-${process.env.VITE_APPWRITE_PROJECT_ID}/databases/database-${process.env.VITE_APPWRITE_DATABASE_ID}/collection-${process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID}`);
  }
}

// Run the upload
uploadProducts().catch(console.error);