/**
 * Generate Sitemap Script
 * 
 * This script generates a sitemap.xml file that includes all static routes
 * and dynamic product pages. Run this during the build process.
 * 
 * Usage: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample products data for sitemap generation
// In production, you would fetch this from your database/API
const getSampleProductsData = () => {
  // Sample product IDs - replace with actual product fetching logic
  const sampleProducts = [
    { id: "1", name: "Gentle Cleansing Oil" },
    { id: "2", name: "Hydrating Face Serum" },
    { id: "3", name: "Nourishing Night Cream" },
    { id: "4", name: "Brightening Eye Cream" },
    { id: "5", name: "Purifying Clay Mask" },
    { id: "6", name: "Refreshing Toner Mist" },
    { id: "7", name: "Vitamin C Serum" },
    { id: "8", name: "Moisturizing Day Cream" },
    { id: "9", name: "Exfoliating Scrub" },
    { id: "10", name: "Anti-Aging Serum" }
  ];
  
  return sampleProducts;
};

// Import products data
// Note: In a real app, you might fetch this from your database/API
const getProductsData = async () => {
  try {
    // For now, use sample data
    // TODO: Replace with actual product fetching from database/API
    return getSampleProductsData();
  } catch (error) {
    console.warn('Could not load products data:', error.message);
    return getSampleProductsData();
  }
};

// Base configuration
const baseSEO = {
  siteUrl: "https://essencepura.com", // Update with your actual domain
};

// Static routes that should be included in sitemap
const staticRoutes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    path: '/shop',
    priority: '0.9',
    changefreq: 'daily'
  },
  {
    path: '/about',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/ingredients',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/contact',
    priority: '0.6',
    changefreq: 'monthly'
  }
];

/**
 * Generate sitemap XML content
 * @param {Array} products - Array of product objects
 * @returns {string} Complete sitemap XML
 */
const generateSitemap = (products = []) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseSEO.siteUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  // Add product pages
  products.forEach(product => {
    const productId = product.id || product.$id;
    if (productId) {
      sitemap += `
  <url>
    <loc>${baseSEO.siteUrl}/product/${productId}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Main function to generate and save sitemap
 */
const main = async () => {
  try {
    console.log('🔄 Generating sitemap...');
    
    // Get products data
    const products = await getProductsData();
    console.log(`📦 Found ${products.length} products`);
    
    // Generate sitemap content
    const sitemapContent = generateSitemap(products);
    
    // Determine output path (public directory)
    const publicDir = path.join(__dirname, '..', 'public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write sitemap file
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`🔗 URLs included: ${staticRoutes.length + products.length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Run the script
main();