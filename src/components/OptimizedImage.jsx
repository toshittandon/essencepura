import { useState, useEffect } from 'react';
import { getProductImageUrl, getOptimizedProductImageUrl } from '@/utils/imageUtils';

/**
 * OptimizedImage Component
 * 
 * A performance-optimized image component with:
 * - Lazy loading
 * - Error handling with fallback
 * - Proper alt attributes
 * - Loading states
 * - Support for product objects (uses imageUtils)
 * 
 * Usage with URL:
 * <OptimizedImage 
 *   src="/path/to/image.jpg" 
 *   alt="Descriptive alt text" 
 *   className="w-full h-auto"
 *   fallback="/Pura.png"
 * />
 * 
 * Usage with product object:
 * <OptimizedImage 
 *   product={productObject}
 *   alt="Product image"
 *   width={300}
 *   height={300}
 *   quality="high"
 * />
 */

export const OptimizedImage = ({
  src,
  product,
  alt,
  className = "",
  fallback = "/Pura.png",
  loading = "lazy",
  width,
  height,
  quality = "medium",
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Determine the image source
  const getImageSrc = () => {
    if (src) return src; // Direct URL provided
    
    if (product) {
      // Use product with optimization if dimensions provided
      if (width || height) {
        return getOptimizedProductImageUrl(product, { width, height, quality });
      }
      return getProductImageUrl(product);
    }
    
    return fallback;
  };
  
  const [currentSrc, setCurrentSrc] = useState(getImageSrc());

  // Update source when props change
  useEffect(() => {
    setCurrentSrc(getImageSrc());
    setHasError(false);
    setIsLoading(true);
  }, [src, product, width, height, quality]);

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    
    // Use fallback image if not already using it
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setHasError(false); // Reset error state for fallback
    }
    
    if (onError) onError(e);
  };

  // Generate appropriate alt text
  const getAltText = () => {
    if (alt) return alt;
    if (product?.name) return `${product.name} product image`;
    return 'Product image';
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-white to-cream animate-pulse rounded" />
      )}
      
      <img
        src={currentSrc}
        alt={getAltText()}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
      
      {hasError && currentSrc === fallback && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded">
          Image unavailable
        </div>
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && product && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
          {hasError ? 'Fallback' : (product?.imageNumber ? `#${product.imageNumber}` : 'Product')}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;