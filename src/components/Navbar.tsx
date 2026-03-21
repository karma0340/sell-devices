'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          BERLIN<span className="blue-gradient-text">SMART</span>
        </Link>
        
        <button 
          className={styles.hamburger} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/support" onClick={() => setIsMenuOpen(false)}>Support</Link>
          <Link href="/admin" onClick={() => setIsMenuOpen(false)} className={styles.mobileOnly}>Admin</Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.cartBtn} onClick={() => setIsOpen(true)}>
            <span className={styles.cartIcon}>🛒</span>
            {totalItems > 0 && <span className={styles.cartCountBadge}>{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
