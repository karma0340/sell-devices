'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const { totalItems, setIsOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
          
          {session && (
            <>
              {session.user?.role === "USER" && (
                <Link href="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              )}
              {session.user?.role === "ADMIN" && (
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
              )}
              <button 
                className={`${styles.mobileOnly} ${styles.mobileLogout}`}
                onClick={() => { setIsMenuOpen(false); signOut({ callbackUrl: '/' }); }}
              >
                Sign Out
              </button>
            </>
          )}

          {!session && (
            <>
              <Link href="/login" className={styles.mobileOnly} onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link href="/signup" className={styles.mobileOnly} onClick={() => setIsMenuOpen(false)}>Create Account</Link>
            </>
          )}
        </div>

        <div className={styles.actions}>
          {session ? (
            <div className={`${styles.userMenu} ${styles.desktopOnly}`}>
              <span className={styles.userName}>{session.user?.name?.split(' ')[0]}</span>
              <button 
                className={styles.logoutBtn} 
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className={`${styles.authButtons} ${styles.desktopOnly}`}>
              <Link href="/login" className={styles.loginBtn}>Login</Link>
              <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
            </div>
          )}
          
          <button className={styles.cartBtn} onClick={() => setIsOpen(true)}>
            <span className={styles.cartIcon}>🛒</span>
            {totalItems > 0 && <span className={styles.cartCountBadge}>{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
