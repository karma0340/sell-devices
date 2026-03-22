'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/actions/orderStatus';
import styles from '../products/Products.module.css';

export default function OrderRow({ order }: { order: any }) {
  const [status, setStatus] = useState(order.status);
  const [estimate, setEstimate] = useState(order.deliveryEstimate || '');
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateOrderStatus(order.id, status, estimate);
      alert('Order updated successfully!');
    } catch (err) {
      alert('Failed to update order.');
    } finally {
      setSaving(false);
    }
  };

  const items = order.items as any[];

  return (
    <tr>
      <td><strong>ORD-{order.id.slice(-6).toUpperCase()}</strong></td>
      <td>
        <div style={{ fontWeight: 600 }}>{order.customer}</div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>{order.phoneNumber}</div>
        <a href={`mailto:${order.email}`} style={{ fontSize: '0.75rem', color: '#1967d2', textDecoration: 'underline', display: 'block' }}>
          {order.email} (Contact)
        </a>
        <div style={{ fontSize: '0.7rem', color: '#444', marginTop: '0.5rem', maxWidth: '180px', lineHeight: '1.2' }}>
          {(() => {
            try {
              const addr = typeof order.address === 'string' ? JSON.parse(order.address) : order.address;
              if (!addr) return 'No address';
              return `${addr.line1 || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.postal_code || ''}`;
            } catch (e) { return 'Address info'; }
          })()}
        </div>
      </td>
      <td>
        <div style={{ fontSize: '0.85rem' }}>
          {items.map((item, i) => (
            <div key={i}>• {item.name || `Product ${item.id}`} x {item.quantity}</div>
          ))}
        </div>
      </td>
      <td>€{order.total.toLocaleString()}</td>
      <td>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
          style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem' }}
        >
          <option value="PAID">PAID</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </td>
      <td>
        <input 
          type="text" 
          value={estimate} 
          onChange={(e) => setEstimate(e.target.value)}
          placeholder="e.g. 3-5 days"
          style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem', width: '100px' }}
        />
      </td>
      <td>
        <button 
          onClick={handleUpdate} 
          disabled={saving}
          className={styles.saveBtn}
          style={{ 
            background: '#111', 
            color: '#fff', 
            border: 'none', 
            padding: '0.4rem 0.8rem', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
        >
          {saving ? '...' : 'Update'}
        </button>
      </td>
    </tr>
  );
}
