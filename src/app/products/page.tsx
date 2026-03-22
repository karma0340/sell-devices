import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import styles from './Products.module.css';
import Link from 'next/link';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory = 'All' } = await searchParams;

  const [products, allCategoryRecords] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      where: activeCategory !== 'All' 
        ? { category: { name: activeCategory } }
        : undefined
    }),
    prisma.category.findMany()
  ]);

  const categories = ['All', ...allCategoryRecords.map(c => c.name)];

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <span className="blue-gradient-text" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Our Inventory
        </span>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>
          Discover the Future.
        </h1>
      </header>

      <div className={styles.filterBar}>
        {categories.map(cat => (
          <Link 
            key={cat}
            href={`/products?category=${cat}`}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
            scroll={false}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            {...product} 
            id={product.id}
            category={product.category.name} 
          />
        ))}
        {products.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
