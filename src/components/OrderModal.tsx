import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Order, Product } from '../types';

interface OrderModalProps {
  product: Product;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ product, onClose }) => {
  const images = product.image.split(',').map(img => img.trim());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    adres: '',
    count: '1',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData: Order = {
        ...formData,
        type: product.name,
      };

      orderData.count = String(Number(orderData.count));

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isArabic = /تشافي|أوركل|أسماء الله الحسن/.test(product.name) || /أوركل/.test(product.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-order" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-image-gallery">
          <img
            src={images[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className="modal-product-image-full"
            key={currentImageIndex}
          />
          
          {hasMultipleImages && (
            <>
              <button 
                className="modal-image-nav-btn modal-image-nav-prev" 
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button 
                className="modal-image-nav-btn modal-image-nav-next" 
                onClick={handleNextImage}
                aria-label="Next image"
              >
                ›
              </button>
              
              <div className="modal-image-dots">
                {images.map((_, index) => (
                  <span 
                    key={index}
                    className={`modal-image-dot ${index === currentImageIndex ? 'active' : ''}`}
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

        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-price">{product.price} L.E</div>
          </div>
          <p className={`modal-description ${isArabic ? 'arabic' : ''}`} dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br>') }} />

          {success && (
            <div className="success-message">
              Your request has been successfully submitted! We will contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="number">
                Phone number *
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                className="form-input"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adres">
                Delivery address *
              </label>
              <textarea
                id="adres"
                name="adres"
                className="form-textarea"
                placeholder="Enter your delivery address in detail"
                value={formData.adres}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="count">
                Quantity *
              </label>
              <input
                type="number"
                id="count"
                name="count"
                className="form-input"
                value={formData.count}
                onChange={handleChange}
                min={1}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="notes">
                notes *
              </label>
              <input
                type="text"
                id="notes"
                name="notes"
                className="form-input"
                placeholder="Write any notes..."
                value={formData.notes}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading || success}
            >
              {loading ? 'Sending....' : success ? 'Sent!' : 'Order now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

