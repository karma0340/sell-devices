'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2>Your cart is empty.</h2>
        <button onClick={() => router.push('/products')} className="glass" style={{ marginTop: '2rem', padding: '1rem 2rem' }}>Go Shopping</button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      router.push('/checkout/success');
    }, 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="gradient-text" style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Checkout</h1>
      
      <div className={styles.layout}>
        <div className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <section>
              <h3>Shipping Information</h3>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="text" placeholder="Street Address" required />
                <div className={styles.twoCol}>
                  <input type="text" placeholder="City (Berlin)" required />
                  <input type="text" placeholder="Postal Code" required />
                </div>
              </div>
            </section>

            <section style={{ marginTop: '3rem' }}>
              <h3>Payment Method</h3>
              <div className={styles.paymentMethods}>
                <div className={styles.paymentOption}>
                  <input type="radio" name="payment" id="card" defaultChecked />
                  <label htmlFor="card">Credit Card (Visa, Mastercard)</label>
                </div>
                <div className={styles.paymentOption}>
                  <input type="radio" name="payment" id="paypal" />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                <input type="text" placeholder="Card Number" />
                <div className={styles.twoCol}>
                  <input type="text" placeholder="MM/YY" />
                  <input type="text" placeholder="CVC" />
                </div>
              </div>
            </section>

            <button type="submit" className={styles.payBtn} disabled={loading}>
              {loading ? 'Processing...' : `Pay €${totalPrice.toLocaleString()}`}
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
