import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    
    // Flatten category for the frontend
    const flattened = products.map(p => ({
      ...p,
      category: p.category?.name || 'Uncategorized'
    }));
    
    return NextResponse.json(flattened);
  } catch (error) {
    console.error('PUBLIC API GET ERROR:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
