import styles from './Admin.module.css';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '24', icon: '📦' },
    { label: 'Pending Orders', value: '12', icon: '⏳' },
    { label: 'Revues (Monthly)', value: '€14,200', icon: '📈' },
    { label: 'Store Visits', value: '1,200', icon: '👥' },
  ];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Overview of your Berlin Smart Devices store.</p>
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
        <h2>Recent Activity</h2>
        <div className={styles.activityItem}>
          <p><strong>Order #1234</strong> placed by Alexander M. for iPhone 15 Pro</p>
          <span>2 hours ago</span>
        </div>
        <div className={styles.activityItem}>
          <p><strong>Stock Alert:</strong> Samsung Galaxy S24 Ultra is running low (2 left)</p>
          <span>5 hours ago</span>
        </div>
      </div>
    </div>
  );
}
