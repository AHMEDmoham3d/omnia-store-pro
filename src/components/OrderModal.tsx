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
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <img
            src={product.image}
            alt={product.name}
            className="modal-product-image"
          />
          <div className="modal-header">
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-price">${product.price}</div>
          </div>
          <p className="modal-description">{product.description}</p>

          {success && (
            <div className="success-message">
              تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                الاسم الكامل *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="number">
                رقم الهاتف *
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                className="form-input"
                placeholder="أدخل رقم هاتفك"
                value={formData.number}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adres">
                عنوان التوصيل *
              </label>
              <textarea
                id="adres"
                name="adres"
                className="form-textarea"
                placeholder="أدخل عنوانك بالتفصيل"
                value={formData.adres}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="count">
                الكمية *
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
                تاريخ التوصيل المفضل *
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
              {loading ? 'جاري الإرسال...' : success ? 'تم الإرسال!' : 'اطلب الآن'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
