'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.adminContainer}>
      <button 
        className={styles.mobileToggle} 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕ Close Menu' : '☰ Admin Menu'}
      </button>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Berlin Admin</h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" onClick={() => setIsSidebarOpen(false)}>Dashboard</Link>
          <Link href="/admin/products" onClick={() => setIsSidebarOpen(false)}>Inventory</Link>
          <Link href="/admin/orders" onClick={() => setIsSidebarOpen(false)}>Orders</Link>
          <div className={styles.divider}></div>
          <Link href="/" onClick={() => setIsSidebarOpen(false)}>Storefront</Link>
        </nav>
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
