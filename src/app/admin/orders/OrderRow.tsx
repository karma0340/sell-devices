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
        <div style={{ fontWeight: 600, color: '#1a1a1b', fontSize: '0.95rem' }}>{order.customer}</div>
        
        <div style={{ marginTop: '0.6rem' }}>
          <a href={`mailto:${order.email}`} style={{ fontSize: '0.8rem', color: '#1967d2', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ✉️ {order.email}
          </a>
          {order.phoneNumber && (
            <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              📞 {order.phoneNumber}
            </div>
          )}
        </div>

        <div style={{ 
          fontSize: '0.75rem', 
          color: '#444', 
          marginTop: '0.8rem', 
          padding: '0.6rem', 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          borderLeft: '3px solid #000',
          lineHeight: '1.4'
        }}>
          <div style={{ opacity: 0.6, marginBottom: '0.2rem', fontWeight: 600 }}>SHIP TO:</div>
          {(() => {
            try {
              const addr = typeof order.address === 'string' ? JSON.parse(order.address) : order.address;
              if (!addr || (!addr.line1 && !addr.city)) return <span style={{ color: '#aaa', fontStyle: 'italic' }}>Pending delivery details...</span>;
              return (
                <div>
                  <strong>{addr.line1}</strong> {addr.line2 && <span>{addr.line2}</span>}<br/>
                  {addr.city}, {addr.state} {addr.postal_code}<br/>
                  <span style={{ opacity: 0.8, fontSize: '0.65rem' }}>{addr.country}</span>
                </div>
              );
            } catch (e) { return <span style={{ color: '#aaa' }}>Processing address...</span>; }
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
