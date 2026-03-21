'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

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
              <h3>Shipping Information (For Stripe Checkout)</h3>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Street Address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required 
                />
                <div className={styles.twoCol}>
                  <input 
                    type="text" 
                    placeholder="City (Berlin)" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required 
                  />
                  <input 
                    type="text" 
                    placeholder="Postal Code" 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </section>

            <section style={{ marginTop: '2rem' }}>
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                You will be redirected to Stripe to securely choose your payment method (PayPal, Card, SEPA, etc.) and complete the purchase.
              </p>
            </section>

            <button type="submit" className={styles.payBtn} disabled={loading}>
              {loading ? 'Processing...' : `Continue to Payment (€${totalPrice.toLocaleString()})`}
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
