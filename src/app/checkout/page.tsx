'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data?.user?.email) {
          setEmail(data.user.email);
          setSession(data);
        }
      });
  }, []);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2>Your cart is empty.</h2>
        <button onClick={() => router.push('/products')} className="glass" style={{ marginTop: '2rem', padding: '1rem 2rem' }}>Go Shopping</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          email: email,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert('Payment initialization failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="gradient-text" style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Checkout</h1>
      
      <div className={styles.layout}>
        <div className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <section>
              <h3 style={{ marginBottom: '1.5rem' }}>Secure Checkout</h3>
              <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
                You are about to complete your order for <strong>{cart.reduce((acc, i) => acc + i.quantity, 0)} items</strong>.
              </p>
              
              {!email && (
                <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                  <input 
                    type="email" 
                    placeholder="Confirm Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              )}
              
              <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  🛡️ <strong>Encrypted Checkout</strong>: You will be redirected to Stripe to securely provide your shipping address and choosing a payment method.
                </p>
              </div>
            </section>

            <button type="submit" className={styles.payBtn} disabled={loading} style={{ marginTop: '2rem' }}>
              {loading ? 'Redircting to Stripe...' : `Proceed to Secure Payment (€${totalPrice.toLocaleString()})`}
            </button>
          </form>
        </div>

        <div className={styles.summarySection}>
          <div className={`${styles.summaryCard} glass`}>
            <h3>Order Summary</h3>
            <div className={styles.itemList}>
              {cart.map(item => (
                <div key={item.id} className={styles.item}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>€{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className={styles.totalLine}>
              <span>Total</span>
              <span>€{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
