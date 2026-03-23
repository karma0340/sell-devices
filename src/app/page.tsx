import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import StoreGallery from '@/components/StoreGallery';
import { prisma } from '@/lib/prisma';
import HomeStyles from './Home.module.css';

export default async function Home() {
  const rawProducts = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  const products = rawProducts.map(p => ({
    ...p,
    category: p.category?.name || 'Uncategorized'
  }));

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
            {products.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <StoreGallery />

      <section className={`glass ${HomeStyles.advantageSection}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className={`gradient-text ${HomeStyles.advantageTitle}`}>
            The Berlin Advantage
          </h2>
          <div className={HomeStyles.advantageGrid}>
            <div>
              <h3 className={HomeStyles.advantageItemTitle}>Same-Day Mitte</h3>
              <p className={HomeStyles.advantageItemText}>Fastest delivery in Mitte. Get your tech in hours.</p>
            </div>
            <div>
              <h3 className={HomeStyles.advantageItemTitle}>Certified Local</h3>
              <p className={HomeStyles.advantageItemText}>Strictly vetted at our Kreuzberg quality center.</p>
            </div>
            <div>
              <h3 className={HomeStyles.advantageItemTitle}>24/7 Support</h3>
              <p className={HomeStyles.advantageItemText}>Real Berliners helping you anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
