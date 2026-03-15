import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // Split the image string by comma to get multiple images
  const images = product.image.split(',').map(img => img.trim());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const isArabic = /تشافي|أوركل|أسماء الله الحسن/.test(product.name) || /أوركل/.test(product.id);

  return (
<div className="product-card">
      <div className="product-image-container" onClick={onClick}>
        <img
          src={images[currentImageIndex]}
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="product-image"
          key={currentImageIndex}
        />
        
        {hasMultipleImages && (
          <>
            {/* Navigation Arrows */}
            <button 
              className="image-nav-btn image-nav-prev" 
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="image-nav-btn image-nav-next" 
              onClick={handleNextImage}
              aria-label="Next image"
            >
              ›
            </button>
            
            {/* Image Dots Indicator */}
            <div className="image-dots">
              {images.map((_, index) => (
                <span 
                  key={index}
                  className={`image-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
<div className="product-content">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        <p 
          className={`product-description ${isArabic ? 'arabic' : ''}`}
          style={{
            direction: isArabic ? 'rtl' : 'ltr',
            textAlign: isArabic ? 'right' : 'left'
          }}
          dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br>') }} 
        />
        <div className="product-footer">
          <div className="product-price">{product.price} L.E</div>
          <button className="product-btn" onClick={onClick}>
           Order now
          </button>
        </div>
      </div>
    </div>
  );
};

