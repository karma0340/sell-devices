'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './Footer.module.css';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.464-2.464l6.768-6.768"></path></svg>
);

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.info}>
          <h3>BERLIN<span className="blue-gradient-text">SMART</span></h3>
          <p>The nexus of technology and style in Berlin.</p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Navigate</h4>
            <Link href="/products">Shop</Link>
            <Link href="/about">About Us</Link>
            <Link href="/support">Support</Link>
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin">Admin Panel</Link>
            )}
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Connect</h4>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <InstagramIcon /> <span>Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <XIcon /> <span>X (Twitter)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; 2026 Berlin Smart Devices GmbH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
