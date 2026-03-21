'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './StoreGallery.module.css';

const STORE_IMAGES = [
  { src: '/assets/store/store-service.jpg', alt: 'Client Service at Berlin Smart Devices' },
  { src: '/assets/store/store-owner.jpg', alt: 'Our Founder' },
  { src: '/assets/store/store-owner-close.jpg', alt: 'Expert Tech Support' },
  { src: '/assets/store/store-interior.jpg', alt: 'Berlin Mitte Showroom' },
];

export default function StoreGallery() {
  return (
    <section className={styles.gallery}>
      <div className="container">
        <div className={styles.header}>
          <span className="blue-gradient-text" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Visit Us in Berlin
          </span>
          <h2 className="gradient-text">Personal Service, <br />Global Standards</h2>
        </div>
        
        <div className={styles.grid}>
          {STORE_IMAGES.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={styles.imageWrapper}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.image} 
              />
              <div className={styles.overlay}>
                <p>{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
