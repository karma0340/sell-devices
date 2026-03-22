import { prisma } from '@/lib/prisma';
import styles from './Admin.module.css';

export default async function AdminDashboard() {
  const [productCount, orderCount, revenueData, userCount, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true }
    }),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  const totalRevenue = revenueData._sum.total || 0;

  const stats = [
    { label: 'Total Products', value: productCount.toString(), icon: '📦' },
    { label: 'Total Orders', value: orderCount.toString(), icon: '⏳' },
    { label: 'Revenue', value: `€${totalRevenue.toLocaleString()}`, icon: '📈' },
    { label: 'Customers', value: userCount.toString(), icon: '👥' },
  ];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Berlin Admin Dashboard</h1>
        <p>Live metrics from your Tech Store.</p>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <span className={styles.icon}>{stat.icon}</span>
            <div className={styles.statInfo}>
              <span className={styles.label}>{stat.label}</span>
              <span className={styles.value}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Live Orders</h2>
        {recentOrders.length === 0 ? (
          <p className={styles.emptyActivity}>No orders yet.</p>
        ) : (
          recentOrders.map((order) => (
            <div key={order.id} className={styles.activityItem}>
              <p>
                <strong>Order #{order.id.slice(-6).toUpperCase()}</strong> - 
                €{order.total.toLocaleString()} by {order.customer}
              </p>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
