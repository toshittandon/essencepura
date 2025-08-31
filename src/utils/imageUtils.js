// Image utility functions for working with Appwrite storage

const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

/**
 * Generate full image URL from file ID
 */
export const getImageUrl = (fileId) => {
  if (!fileId) return null;
  return `${APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
};

/**
 * Generate preview/thumbnail URL from file ID
 */
export const getImagePreview = (fileId, width = 300, height = 300, quality = 80) => {
  if (!fileId) return null;
  return `${APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/preview?project=${PROJECT_ID}&width=${width}&height=${height}&gravity=center&quality=${quality}&output=webp`;
};

/**
 * Generate download URL from file ID
 */
export const getImageDownload = (fileId) => {
  if (!fileId) return null;
  return `${APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/download?project=${PROJECT_ID}`;
};

/**
 * Extract file ID from Appwrite URL
 */
export const extractFileIdFromUrl = (url) => {
  if (!url) return null;
  const match = url.match(/files\/([^\/]+)\//);
  return match ? match[1] : null;
};

/**
 * Check if URL is an Appwrite storage URL
 */
export const isAppwriteStorageUrl = (url) => {
  return url && url.includes('/storage/buckets/') && url.includes('/files/');
};

/**
 * Validate image file type
 */
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  return validTypes.includes(file.type);
};

/**
 * Validate image file size (default 5MB)
 */
export const isValidImageSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ========================================
// Public Product Images Utilities
// ========================================

// Base URL for product images in the public folder
const PUBLIC_IMAGE_BASE = '/Products';

/**
 * Get the full image URL for a product
 * Handles both Appwrite Storage URLs and public folder URLs
 * @param {Object} product - The product object
 * @returns {string} - The image URL or fallback
 */
export function getProductImageUrl(product) {
  // Priority order for image sources:
  // 1. image field (newest format)
  // 2. imageUrl field (legacy)
  // 3. imageFileId (Appwrite Storage)
  // 4. Fallback to default

  if (product.image) {
    // If it's already a full URL (starts with http), return as is
    if (product.image.startsWith('http')) {
      return product.image;
    }
    // If it's a relative path, ensure it's properly formatted
    if (product.image.startsWith('/')) {
      return product.image;
    }
    // If it's just a filename, prepend the public image base
    return `${PUBLIC_IMAGE_BASE}/${product.image}`;
  }

  if (product.imageUrl) {
    return product.imageUrl;
  }

  // If using Appwrite Storage file ID
  if (product.imageFileId) {
    return getImageUrl(product.imageFileId);
  }

  // Fallback based on product number or ID
  if (product.imageNumber) {
    return `${PUBLIC_IMAGE_BASE}/${product.imageNumber}.png`;
  }

  // Final fallback
  return '/Pura.png';
}

/**
 * Get the image number from a product image URL
 * @param {string} imageUrl - The image URL
 * @returns {number|null} - The image number or null if not found
 */
export function getImageNumberFromUrl(imageUrl) {
  if (!imageUrl) return null;
  
  const match = imageUrl.match(/\/Products\/(\d+)\.png$/);
  return match ? parseInt(match[1]) : null;
}

/**
 * Check if an image URL points to the public Products folder
 * @param {string} imageUrl - The image URL
 * @returns {boolean} - True if it's a public Products folder image
 */
export function isPublicProductImage(imageUrl) {
  if (!imageUrl) return false;
  return imageUrl.includes('/Products/') && imageUrl.endsWith('.png');
}

/**
 * Generate a product image URL based on image number
 * @param {number} imageNumber - The image number (1-26)
 * @returns {string} - The image URL
 */
export function generateProductImageUrl(imageNumber) {
  if (imageNumber < 1 || imageNumber > 26) {
    return '/Pura.png';
  }
  return `${PUBLIC_IMAGE_BASE}/${imageNumber}.png`;
}

/**
 * Validate if a product image exists (client-side check)
 * @param {string} imageUrl - The image URL to validate
 * @returns {Promise<boolean>} - Promise that resolves to true if image exists
 */
export function validateImageExists(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;
  });
}

/**
 * Get optimized image URL with loading parameters
 * @param {Object} product - The product object
 * @param {Object} options - Options for image optimization
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height
 * @param {string} options.quality - Image quality (high, medium, low)
 * @returns {string} - Optimized image URL
 */
export function getOptimizedProductImageUrl(product, options = {}) {
  const baseUrl = getProductImageUrl(product);
  
  // For Appwrite Storage images, we can use preview with optimization
  if (product.imageFileId) {
    const quality = options.quality === 'high' ? 90 : options.quality === 'low' ? 60 : 80;
    return getImagePreview(product.imageFileId, options.width, options.height, quality);
  }
  
  // For public folder images, return as is (no server-side optimization available)
  return baseUrl;
}