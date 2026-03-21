'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.content}>
          <span className={styles.badge}>Berlin's Premier Tech Hub</span>
          <h1 className="gradient-text">
            The Future of <br />
            <span className="blue-gradient-text">Smart Living.</span>
          </h1>
          <p>
            Experience the latest in mobile technology and tech gadgets. 
            Curated for the innovators of Berlin.
          </p>
          <div className={styles.cta}>
            <Link href="/products" className={styles.primaryBtn}>Explore Collection</Link>
            <Link href="#featured-tech" className={styles.secondaryBtn}>Visit Store</Link>
          </div>
        </div>
        
        <div className={styles.imageWrapper}>
          <div className={styles.imageGlow}></div>
          <Image 
            src="/assets/berlin_tech_hero.png" 
            alt="Premium Tech in Berlin"
            width={600}
            height={600}
            priority
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
}
