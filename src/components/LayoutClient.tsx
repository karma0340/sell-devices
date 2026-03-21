'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import styles from './LayoutClient.module.css';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <CartProvider>
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      <main className={!isAdmin ? styles.mainLayout : ''}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </CartProvider>
  );
}
