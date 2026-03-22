import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  console.log('Product count:', count);
  const products = await prisma.product.findMany({ include: { category: true } });
  console.log('Products:', JSON.stringify(products, null, 2).slice(0, 500));
}

main().catch(console.error).finally(() => prisma.$disconnect());
