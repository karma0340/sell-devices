'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart();
  }, []);
  
  return (
    <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
      <div className="glass" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', borderRadius: '1rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉 Payment Successful!</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
          Thank you for your purchase. We are processing your order and will send you an email confirmation shortly.
        </p>
        <Link href="/" className="glass" style={{ padding: '1rem 2rem', display: 'inline-block', textDecoration: 'none', color: 'inherit' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
