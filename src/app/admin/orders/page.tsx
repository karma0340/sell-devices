import styles from '../products/Products.module.css';

export default function AdminOrders() {
  const orders = [
    { id: 'ORD-1234', customer: 'Alexander M.', date: '21.03.2026', total: 1449, status: 'Shipped' },
    { id: 'ORD-1235', customer: 'Elena S.', date: '21.03.2026', total: 399, status: 'Processing' },
    { id: 'ORD-1236', customer: 'Markus K.', date: '20.03.2026', total: 1339, status: 'Delivered' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Customer Orders</h1>
        <p>Manage and track your smart device sales.</p>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong></td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>€{order.total.toLocaleString()}</td>
                <td>
                  <span style={{ 
                    background: order.status === 'Shipped' ? '#e8f0fe' : order.status === 'Delivered' ? '#e6f4ea' : '#fff4e5',
                    color: order.status === 'Shipped' ? '#1967d2' : order.status === 'Delivered' ? '#1e8e3e' : '#b06000',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {order.status}
                  </span>
                </td>
                <td><button className={styles.editBtn}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
