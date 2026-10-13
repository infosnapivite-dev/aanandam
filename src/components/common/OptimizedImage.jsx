import React, { useState } from 'react';

export default function OptimizedImage({
  src,
  alt = 'Aanandam Pack Studio packaging',
  className = '',
  imgClassName = '',
  loading = 'lazy',
  aspectRatio = '',
  objectFit = 'object-cover',
  priority = false,
  onClick
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-[#EEE8DD] ${aspectRatio} ${className}`}
    >
      {/* Skeleton Shimmer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 skeleton-shimmer z-0 pointer-events-none" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#EFE4DA] text-[#777268] text-xs text-center">
          <span className="font-serif text-sm text-[#173D2C] mb-1">Aanandam Pack Studio</span>
          <span>Sample Packaging Asset</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full ${objectFit} transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
