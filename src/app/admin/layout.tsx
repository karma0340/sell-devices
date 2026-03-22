'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

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
          <h2>Berlin <span className="blue-gradient-text" style={{ fontSize: '1rem' }}>Admin</span></h2>
        </div>
        <nav className={styles.nav}>
          <Link 
            href="/admin" 
            className={pathname === '/admin' ? styles.active : ''}
            onClick={() => setIsSidebarOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className={pathname.startsWith('/admin/products') ? styles.active : ''}
            onClick={() => setIsSidebarOpen(false)}
          >
            Inventory
          </Link>
          <Link 
            href="/admin/orders" 
            className={pathname.startsWith('/admin/orders') ? styles.active : ''}
            onClick={() => setIsSidebarOpen(false)}
          >
            Orders
          </Link>
          <div className={styles.divider}></div>
          <Link 
            href="/" 
            className={styles.storeLink}
            onClick={() => setIsSidebarOpen(false)}
          >
            ← Visit Store
          </Link>
          <button 
            className={styles.logoutBtn} 
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Sign Out
          </button>
        </nav>
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
