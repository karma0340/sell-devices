import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { PRODUCTS } from '@/lib/data';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  // Intercept hardcoded items from the landing page to prevent MongoDB BSON length errors
  if (id.length < 24) {
    const staticProduct = PRODUCTS.find((p) => p.id === id);
    if (staticProduct) {
      return (
        <ProductDetailClient 
          product={{
            ...staticProduct,
            category: { name: staticProduct.category }
          }} 
        />
      );
    }
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
