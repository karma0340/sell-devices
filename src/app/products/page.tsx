'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/data';
import styles from './Products.module.css';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <span className="blue-gradient-text" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Our Inventory
        </span>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>
          Discover the Future.
        </h1>
      </header>

      <div className={styles.filterBar}>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
