'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './ProductDetail.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductDetailClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  return (
    <div className={styles.container}>
      <Link href="/products" className={styles.backLink}>
        <span>&larr;</span> Back to Inventory
      </Link>

      <motion.div 
        className={styles.grid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.imageSection}>
          {!imgError ? (
            <img 
              src={product.image || '/assets/default.png'} 
              alt={product.name} 
              className={styles.productImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              📱
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.category}>{product.category.name}</div>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>€{product.price.toLocaleString()}</div>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span> Premium Quality Guarantee
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span> Fast & Secure Shipping
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span> 30-Day Money-Back Return Policy
            </div>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.addToCartBtn} 
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category.name
              })}
            >
              <span>💳</span> Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
