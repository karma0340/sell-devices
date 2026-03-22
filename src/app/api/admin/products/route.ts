import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
    console.error('API GET ERROR:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, name, category, price, description, image, features } = await req.json();

    // Find or create category
    const categoryRecord = await prisma.category.upsert({
      where: { name: category || 'Uncategorized' },
      update: {},
      create: { name: category || 'Uncategorized' },
    });

    const data = {
      name,
      price: parseFloat(price?.toString() || '0'),
      description,
      features: Array.isArray(features) ? features : [],
      image: image || '/assets/default.png',
      categoryId: categoryRecord.id,
    };

    if (id) {
      const product = await prisma.product.update({
        where: { id },
        data,
      });
      return NextResponse.json(product);
    } else {
      const product = await prisma.product.create({
        data,
      });
      return NextResponse.json(product);
    }
  } catch (error: any) {
    console.error('API POST ERROR:', error);
    return NextResponse.json({ error: error?.message || 'Failed to save product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API DELETE ERROR:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
