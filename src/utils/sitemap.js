/**
 * Sitemap Generation Utility
 * 
 * This utility generates sitemap.xml content dynamically.
 * It includes all main routes and can be extended to include product pages.
 */

import { baseSEO } from './seo';

// Static routes that should be included in sitemap
export const staticRoutes = [
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
 * @param {Array} products - Array of product objects (optional)
 * @returns {string} Complete sitemap XML
 */
export const generateSitemap = (products = []) => {
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
 * Save sitemap to public directory
 * This function would typically be called during build process
 * @param {Array} products - Array of product objects
 */
export const saveSitemap = async (products = []) => {
  const sitemapContent = generateSitemap(products);
  
  // In a real application, you would write this to the public directory
  // For now, we'll create a static version
  return sitemapContent;
};