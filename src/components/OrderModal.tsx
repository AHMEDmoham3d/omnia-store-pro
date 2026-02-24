import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Order, Product } from '../types';

interface OrderModalProps {
  product: Product;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    adres: '',
    count: '1',
    delivery_date: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // إرسال الأوردر
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إنشاء object للأوردر مع النوع الصحيح
      const orderData: Order = {
        ...formData,
        type: product.name,
      };

      // تأكد أن count رقم
      orderData.count = Number(orderData.count);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'count' ? Number(value) : value, // تحويل count تلقائيًا
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <h2 className="modal-title">Order {product.name}</h2>

          {success && (
            <div className="success-message">
              Order submitted successfully! We'll contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="number">
                Phone Number *
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                className="form-input"
                value={formData.number}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adres">
                Delivery Address *
              </label>
              <textarea
                id="adres"
                name="adres"
                className="form-textarea"
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
              <label className="form-label" htmlFor="delivery_date">
                Preferred Delivery Date *
              </label>
              <input
                type="date"
                id="delivery_date"
                name="delivery_date"
                className="form-input"
                value={formData.delivery_date}
                onChange={handleChange}
                required
                disabled={loading || success}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading || success}
            >
              {loading ? 'Submitting...' : success ? 'Order Submitted!' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};