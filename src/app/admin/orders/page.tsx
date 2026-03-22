import { prisma } from '@/lib/prisma';
import styles from '../products/Products.module.css';

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="gradient-text">Fulfillment Center</h1>
        <p>Real-time order tracking and customer management.</p>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const items = order.items as any[];
              return (
                <tr key={order.id}>
                  <td><strong>ORD-{order.id.slice(-6).toUpperCase()}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.customer}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{order.email}</div>
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
                    <span style={{ 
                      background: order.status === 'PAID' ? '#e6f4ea' : order.status === 'SHIPPED' ? '#e8f0fe' : '#f1f3f4',
                      color: order.status === 'PAID' ? '#1e8e3e' : order.status === 'SHIPPED' ? '#1967d2' : '#5f6368',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '6rem', color: '#999' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📦</div>
                  No orders have been received yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
