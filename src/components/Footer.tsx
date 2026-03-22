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

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
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

          <div className={styles.linkGroup}>
            <h4>Contact</h4>
            <div className={styles.contactInfo}>
              <a href="mailto:marvinlala90@gmail.com" className={styles.contactItem}>
                <MailIcon /> <span>marvinlala90@gmail.com</span>
              </a>
              <a href="tel:+49312146738" className={styles.contactItem}>
                <PhoneIcon /> <span>+49 312146738</span>
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
