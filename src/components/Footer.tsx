import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.info}>
          <h3>BERLIN<span className="blue-gradient-text">SMART</span></h3>
          <p>The nexus of technology and style in Berlin.</p>
        </div>
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Navigate</h4>
            <a href="/products">Shop</a>
            <a href="/about">About Us</a>
            <a href="/admin">Admin Panel</a>
          </div>
          <div className={styles.linkGroup}>
            <h4>Connect</h4>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://twitter.com">Twitter</a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; 2026 Berlin Smart Devices GmbH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
