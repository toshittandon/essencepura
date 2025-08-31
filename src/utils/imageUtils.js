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