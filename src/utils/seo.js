/**
 * SEO Utility for managing meta tags and SEO data across the application
 * 
 * This utility provides reusable SEO metadata for each page.
 * To add new pages:
 * 1. Add a new entry to the pageMetadata object
 * 2. Use the getSEOData function in your page component
 * 3. Pass the data to the SEOHead component
 */

// Base SEO configuration
export const baseSEO = {
  siteName: "Essence Pura",
  siteUrl: "https://essencepura.com", // Update with your actual domain
  defaultTitle: "Essence Pura - Essence of You",
  defaultDescription: "Discover our collection of organic, cruelty-free cosmetics crafted with nature's finest ingredients. Premium skincare that's gentle on you and the earth.",
  defaultKeywords: "organic cosmetics, cruelty-free skincare, natural beauty products, premium skincare, eco-friendly cosmetics",
  defaultImage: "/uploads/1.png", // Default OG image
  twitterHandle: "@essencepura", // Update with your Twitter handle
  author: "Essence Pura"
};

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: "Essence Pura - Premium Organic Cosmetics & Skincare",
    description: "Discover our collection of organic, cruelty-free cosmetics crafted with nature's finest ingredients. Premium skincare that's gentle on you and the earth.",
    keywords: "organic cosmetics, cruelty-free skincare, natural beauty products, premium skincare, eco-friendly cosmetics, essence pura",
    path: "/",
    image: "/uploads/1.png"
  },
  
  shop: {
    title: "Shop Premium Organic Cosmetics | Essence Pura",
    description: "Browse our complete collection of organic, cruelty-free beauty products. From skincare to makeup, find your perfect natural beauty essentials.",
    keywords: "shop organic cosmetics, buy natural skincare, cruelty-free makeup, organic beauty products, natural cosmetics store",
    path: "/shop",
    image: "/uploads/1.png"
  },
  
  about: {
    title: "About Essence Pura - Our Story & Mission",
    description: "Learn about Essence Pura's commitment to creating premium organic cosmetics that are cruelty-free and environmentally conscious.",
    keywords: "about essence pura, organic cosmetics company, cruelty-free beauty brand, sustainable skincare, natural beauty mission",
    path: "/about",
    image: "/uploads/1.png"
  },
  
  ingredients: {
    title: "Natural Ingredients | Essence Pura Organic Cosmetics",
    description: "Discover the natural, organic ingredients we use in our premium skincare and cosmetic products. Pure, effective, and sustainably sourced.",
    keywords: "natural ingredients, organic skincare ingredients, sustainable cosmetics, pure beauty ingredients, natural cosmetic formulations",
    path: "/ingredients",
    image: "/uploads/1.png"
  },
  
  contact: {
    title: "Contact Essence Pura - Get in Touch",
    description: "Have questions about our organic cosmetics? Contact Essence Pura for customer support, product information, or partnership inquiries.",
    keywords: "contact essence pura, customer support, organic cosmetics help, beauty product questions, skincare support",
    path: "/contact",
    image: "/uploads/1.png"
  },
  
  // Protected pages (these will have noindex in robots meta)
  profile: {
    title: "My Profile | Essence Pura",
    description: "Manage your Essence Pura account, view order history, and update your preferences.",
    keywords: "user profile, account management, order history, essence pura account",
    path: "/profile",
    image: "/uploads/1.png",
    noIndex: true
  },
  
  cart: {
    title: "Shopping Cart | Essence Pura",
    description: "Review your selected organic cosmetics and proceed to secure checkout.",
    keywords: "shopping cart, organic cosmetics cart, checkout, beauty products cart",
    path: "/cart",
    image: "/uploads/1.png",
    noIndex: true
  },
  
  checkout: {
    title: "Secure Checkout | Essence Pura",
    description: "Complete your purchase of premium organic cosmetics with our secure checkout process.",
    keywords: "secure checkout, buy organic cosmetics, payment, order completion",
    path: "/checkout",
    image: "/uploads/1.png",
    noIndex: true
  },
  
  login: {
    title: "Login | Essence Pura",
    description: "Sign in to your Essence Pura account to access your profile, order history, and exclusive offers.",
    keywords: "login, sign in, user account, essence pura account access",
    path: "/login",
    image: "/uploads/1.png",
    noIndex: true
  }
};

/**
 * Get SEO data for a specific page
 * @param {string} pageKey - The key from pageMetadata object
 * @param {Object} customData - Optional custom data to override defaults
 * @returns {Object} Complete SEO data object
 */
export const getSEOData = (pageKey, customData = {}) => {
  const pageData = pageMetadata[pageKey] || pageMetadata.home;
  
  return {
    title: customData.title || pageData.title || baseSEO.defaultTitle,
    description: customData.description || pageData.description || baseSEO.defaultDescription,
    keywords: customData.keywords || pageData.keywords || baseSEO.defaultKeywords,
    image: customData.image || pageData.image || baseSEO.defaultImage,
    url: `${baseSEO.siteUrl}${customData.path || pageData.path || '/'}`,
    noIndex: customData.noIndex || pageData.noIndex || false,
    ...customData
  };
};

/**
 * Generate product-specific SEO data
 * @param {Object} product - Product object with name, description, image, etc.
 * @returns {Object} Product SEO data
 */
export const getProductSEOData = (product) => {
  if (!product) {
    return getSEOData('shop');
  }
  
  return {
    title: `${product.name} | Premium Organic Cosmetics | Essence Pura`,
    description: product.description || `Discover ${product.name}, a premium organic cosmetic product from Essence Pura. Cruelty-free and made with natural ingredients.`,
    keywords: `${product.name}, organic cosmetics, cruelty-free skincare, natural beauty products, ${product.category || 'beauty products'}`,
    image: product.image || baseSEO.defaultImage,
    url: `${baseSEO.siteUrl}/product/${product.id || product.$id}`,
    path: `/product/${product.id || product.$id}`,
    productData: {
      name: product.name,
      price: product.price,
      category: product.category,
      availability: product.stock > 0 ? 'InStock' : 'OutOfStock'
    }
  };
};

/**
 * Generate structured data for products (JSON-LD)
 * @param {Object} product - Product object
 * @returns {Object} Structured data object
 */
export const getProductStructuredData = (product) => {
  if (!product) return null;
  
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image ? `${baseSEO.siteUrl}${product.image}` : `${baseSEO.siteUrl}${baseSEO.defaultImage}`,
    "brand": {
      "@type": "Brand",
      "name": baseSEO.siteName
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": baseSEO.siteName
      }
    }
  };
};