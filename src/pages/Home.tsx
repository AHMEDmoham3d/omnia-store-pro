import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { OrderModal } from '../components/OrderModal';
import { products } from '../data/products';
import { Product } from '../types';
import { trackPageView } from '../lib/analytics';

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    trackPageView('home');
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'incense', label: 'Spiritual Incense' },
    { id: 'oils', label: 'Sacred Oils' },
    { id: 'cards', label: 'Oracle Cards' },
    { id: 'carpets', label: 'Prayer Carpets' },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <h1>Beyond Holistic Store</h1>
          <p>
          Here you will find carefully selected spiritual items designed to support your journey of healing, awarness and inner balance.
          </p>
        </div>
      </section>

      <section className="section" id="incense">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-title">Sacred Incense Collection</h2>
          <p className="section-subtitle">
Natural incense selected to purify your space,  uplift your spirit and create a peaceful stmosphere for meditation, rituals and everyday moments 
          </p>
        </div>
        <div className="products-grid">
          {products.filter(p => p.category === 'incense').map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  trackPageView('incense-product');
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* <section className="section" id="oils">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-title">Sacred Essential Oils</h2>
          <p className="section-subtitle">
            Pure, therapeutic-grade essential oils for healing rituals, aromatherapy, and spiritual practices.
            Each oil is carefully crafted to enhance your spiritual journey.
          </p>
        </div>
        <div className="products-grid">
          {products.filter(p => p.category === 'oils').map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  trackPageView('oils-product');
                }}
              />
            </div>
          ))}
        </div>
      </section> */}

      <section className="section" id="cards">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-title">Oracle & Healing Cards</h2>
          <p className="section-subtitle">
        
Discover a unique collection of cards that desgined to help you to connect to your intuition , recieve guidance , deepen self-awareness and bring moments of reflection and connection .
          </p>
        </div>
        <div className="products-grid">
          {products.filter(p => p.category === 'cards').map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  trackPageView('cards-product');
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* <section className="section" id="carpets">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-title">Sacred Prayer Carpets</h2>
          <p className="section-subtitle">
            Luxurious prayer rugs and meditation mats with sacred geometry and spiritual designs.
            Create your perfect sacred space for practice.
          </p>
        </div>
        <div className="products-grid">
          {products.filter(p => p.category === 'carpets').map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  trackPageView('carpets-product');
                }}
              />
            </div>
          ))}
        </div>
      </section> */}

      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};
