'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
      <div className="glass" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', borderRadius: '1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌ Payment Cancelled</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
          No worries! Your order has not been charged. You can return to your cart or try again.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/checkout" className="glass" style={{ padding: '1rem 2rem', textDecoration: 'none', color: 'inherit' }}>
            Back to Checkout
          </Link>
          <Link href="/" className="glass" style={{ padding: '1rem 2rem', textDecoration: 'none', color: 'inherit' }}>
            Go to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
