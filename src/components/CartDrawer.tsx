'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={`${styles.drawer} glass`} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className={styles.items}>
          {cart.length === 0 ? (
            <div className={styles.empty}>Your cart is empty</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <span>€{item.price.toLocaleString()}</span>
                </div>
                <div className={styles.controls}>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button className={styles.remove} onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Subtotal</span>
              <span>€{totalPrice.toLocaleString()}</span>
            </div>
            <Link 
              href="/checkout" 
              className={styles.checkoutBtn} 
              onClick={() => setIsOpen(false)}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
