'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎉</div>
      <h1 className="gradient-text">Thank You for Your Order!</h1>
      <p style={{ color: '#888', marginTop: '1rem', fontSize: '1.2rem' }}>
        Your devices are being prepared at our Berlin Mitte tech hub. <br />
        A confirmation email has been sent to you.
      </p>
      <div style={{ marginTop: '3rem' }}>
        <Link 
          href="/" 
          style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}
        >
          Return to Store
        </Link>
      </div>
    </div>
  );
}
