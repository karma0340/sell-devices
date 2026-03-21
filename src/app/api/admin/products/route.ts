import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data';

// This is a mock API for admin operations. 
// In a real app with Prisma, you'd use:
// const products = await prisma.product.findMany();

export async function GET() {
  return NextResponse.json(PRODUCTS);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newProduct = {
    id: Math.random().toString(36).substr(2, 9),
    ...data
  };
  // Normally: await prisma.product.create({ data: newProduct });
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(request: Request) {
  const data = await request.json();
  // Normally: await prisma.product.update({ where: { id: data.id }, data });
  return NextResponse.json({ message: 'Product updated bundle' });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // Normally: await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: `Product ${id} deleted` });
}
