import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    name: 'iPhone 15 Pro',
    description: 'The latest iPhone with Titanium design and the A17 Pro chip.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    category: 'Phones',
    features: ['Titanium Case', 'A17 Pro Chip', 'Action Button', 'USB-C']
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The ultimate smartphone experience with Galaxy AI.',
    price: 1339,
    image: 'https://images.unsplash.com/photo-1707151022228-25501cfee79e?auto=format&fit=crop&q=80&w=800',
    category: 'Phones',
    features: ['Galaxy AI', 'S Pen Included', '200MP Camera', 'Snapdragon 8 Gen 3']
  },
  {
    name: 'MacBook Pro M3 Max',
    description: 'The most powerful laptop for the most demanding pro workflows.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1517336714467-d13a23234e48?auto=format&fit=crop&q=80&w=800',
    category: 'Laptops',
    features: ['M3 Max Chip', 'Liquid Retina XDR', '128GB Unified Memory', '22h Battery Life']
  },
  {
    name: 'AirPods Pro Gen 2',
    description: 'Pro performance in every note. Magic in every touch.',
    price: 279,
    image: 'https://images.unsplash.com/photo-1588423770110-316279f0607d?auto=format&fit=crop&q=80&w=800',
    category: 'Audio',
    features: ['Active Noise Cancellation', 'Adaptive Audio', 'Personalized Spatial Audio', '6h Battery']
  },
  {
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch ever.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1544117518-30dfd64134b1?auto=format&fit=crop&q=80&w=800',
    category: 'Wearables',
    features: ['49mm Titanium Case', 'Dual Frequency GPS', '3000 nits display', '72h Low Power Mode']
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'World leading noise canceling for pure silence.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Audio',
    features: ['Auto NC Optimizer', 'Multipoint Connection', '30h Battery Life', 'Speak-to-Chat']
  }
];

async function main() {
  console.log('Clearing old products...');
  await prisma.product.deleteMany({});
  
  console.log('Seeding new products...');
  for (const product of PRODUCTS) {
    try {
      const category = await prisma.category.upsert({
        where: { name: product.category },
        update: {},
        create: { name: product.category },
      });

      const p = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          features: product.features,
          categoryId: category.id,
        },
      });
      console.log(`Created: ${p.name}`);
    } catch (err) {
      console.error(`Error creating ${product.name}:`, err);
    }
  }

  console.log('Seed success!');
}

main()
  .catch((e) => {
    console.error('CRITICAL SEED ERROR:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
