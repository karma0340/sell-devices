import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import StoreGallery from '@/components/StoreGallery';
import { PRODUCTS } from '@/lib/data';
import HomeStyles from './Home.module.css';

export default function Home() {
  return (
    <>
      <Hero />
      
      <section id="featured-tech" style={{ padding: '3rem 0', background: 'var(--background)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <span className="blue-gradient-text" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                Latest Arrivals
              </span>
              <h2 style={{ fontSize: '3.5rem', marginTop: '0.5rem' }} className="gradient-text">
                Featured Tech
              </h2>
            </div>
          </div>

          <div className={HomeStyles.productGrid}>
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <StoreGallery />

      <section className="glass" style={{ margin: '0.5rem 0', padding: '1.5rem 0', borderLeft: 'none', borderRight: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }} className="gradient-text">
            The Berlin Advantage
          </h2>
          <div className={HomeStyles.advantageGrid}>
            <div>
              <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary)', fontSize: '0.9rem' }}>Same-Day Mitte</h3>
              <p style={{ color: '#666', fontSize: '0.75rem' }}>Fastest delivery in Mitte. Get your tech in hours.</p>
            </div>
            <div>
              <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary)', fontSize: '0.9rem' }}>Certified Local</h3>
              <p style={{ color: '#666', fontSize: '0.75rem' }}>Strictly vetted at our Kreuzberg quality center.</p>
            </div>
            <div>
              <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary)', fontSize: '0.9rem' }}>24/7 Support</h3>
              <p style={{ color: '#666', fontSize: '0.75rem' }}>Real Berliners helping you anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
