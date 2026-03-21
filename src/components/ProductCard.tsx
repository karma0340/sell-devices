'use client';

import { motion } from 'framer-motion';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard(props: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`${styles.card} glass`}
    >
      <div className={styles.imageContainer}>
        <div className={styles.categoryBadge}>{props.category}</div>
        <div className={styles.imagePlaceholder}>
          <span style={{ fontSize: '3rem' }}>📱</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>€{props.price.toLocaleString()}</span>
          <button className={styles.addBtn} onClick={() => addToCart(props)}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
