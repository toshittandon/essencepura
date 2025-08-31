import { useState, useCallback } from 'react';
import { storage } from '../lib/appwrite';
import { ID } from 'appwrite';
import { getImageUrl, getImagePreview, isValidImageFile, isValidImageSize } from '../utils/imageUtils';

const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID;

export const useProductImages = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  // Upload image to bucket
  const uploadImage = useCallback(async (file, fileName) => {
    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Validate file
      if (!isValidImageFile(file)) {
        throw new Error('Please select a valid image file (JPG, PNG, GIF, WebP, SVG)');
      }

      if (!isValidImageSize(file, 5)) {
        throw new Error('Image must be smaller than 5MB');
      }

      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file,
        undefined,
        (progress) => {
          setUploadProgress((progress.chunksUploaded / progress.chunksTotal) * 100);
        }
      );

      const imageUrl = getImageUrl(response.$id);
      
      setUploading(false);
      setUploadProgress(100);

      return {
        fileId: response.$id,
        imageUrl,
        fileName: fileName || file.name
      };
    } catch (error) {
      setUploading(false);
      setUploadProgress(0);
      setError(error.message);
      throw error;
    }
  }, []);

  // Delete image from bucket
  const deleteImage = useCallback(async (fileId) => {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      setError(`Failed to delete image: ${error.message}`);
      throw error;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    uploading,
    uploadProgress,
    error,
    uploadImage,
    deleteImage,
    getImageUrl,
    getImagePreview,
    clearError
  };
};