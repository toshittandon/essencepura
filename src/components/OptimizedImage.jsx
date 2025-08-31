import { useState } from 'react';

/**
 * OptimizedImage Component
 * 
 * A performance-optimized image component with:
 * - Lazy loading
 * - Error handling with fallback
 * - Proper alt attributes
 * - Loading states
 * 
 * Usage:
 * <OptimizedImage 
 *   src="/path/to/image.jpg" 
 *   alt="Descriptive alt text" 
 *   className="w-full h-auto"
 *   fallback="/Pura.png"
 * />
 */

export const OptimizedImage = ({
  src,
  alt,
  className = "",
  fallback = "/Pura.png",
  loading = "lazy",
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

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

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
      
      {hasError && currentSrc === fallback && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;