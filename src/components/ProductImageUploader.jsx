import React, { useState, useRef } from 'react';
import { useProductImages } from '../hooks/useProductImages';

const ProductImageUploader = ({ 
  currentImageId, 
  currentImageUrl, 
  onImageUpdate, 
  className = '' 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  const { 
    uploading, 
    uploadProgress, 
    uploadImage, 
    deleteImage, 
    getImageUrl,
    getImagePreview 
  } = useProductImages();

  const handleFiles = async (files) => {
    const file = files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }

    setError(null);

    try {
      // Delete old image if exists
      if (currentImageId) {
        await deleteImage(currentImageId);
      }

      // Upload new image
      const result = await uploadImage(file);
      
      // Update parent component
      onImageUpdate({
        imageFileId: result.fileId,
        imageUrl: result.imageUrl,
        image: result.imageUrl // backward compatibility
      });

    } catch (err) {
      setError(err.message);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImageId) return;

    try {
      await deleteImage(currentImageId);
      onImageUpdate({
        imageFileId: null,
        imageUrl: null,
        image: null
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Display */}
      {currentImageUrl && (
        <div className="relative">
          <img
            src={currentImageId ? getImagePreview(currentImageId, 400, 300) : currentImageUrl}
            alt="Product"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            disabled={uploading}
          >
            ×
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="space-y-2">
            <div className="text-blue-600">Uploading...</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="text-sm text-gray-500">{Math.round(uploadProgress)}%</div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-gray-600">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span>
              {' '}or drag and drop
            </div>
            <div className="text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;