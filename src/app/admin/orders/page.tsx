import { prisma } from '@/lib/prisma';
import styles from '../products/Products.module.css';
import OrderRow from './OrderRow';

export const dynamic = 'force-dynamic';

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
        <table className={styles.table} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid rgba(0,0,0,0.05)' }}>
              <th style={{ padding: '1.5rem 1rem' }}>Order ID</th>
              <th style={{ padding: '1.5rem 1rem' }}>Customer</th>
              <th style={{ padding: '1.5rem 1rem' }}>Products</th>
              <th style={{ padding: '1.5rem 1rem' }}>Total</th>
              <th style={{ padding: '1.5rem 1rem' }}>Status</th>
              <th style={{ padding: '1.5rem 1rem' }}>Delivery Est.</th>
              <th style={{ padding: '1.5rem 1rem' }}>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <OrderRow key={order.id} order={order} />
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '6rem', color: '#999' }}>
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
