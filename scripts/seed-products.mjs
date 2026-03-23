import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    name: 'iPhone 15 Pro',
    description: 'The latest iPhone with Titanium design and the A17 Pro chip.',
    price: 1199,
    image: '/assets/iphone.png',
    category: 'Phones',
    features: ['Titanium Case', 'A17 Pro Chip', 'Action Button', 'USB-C']
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The ultimate smartphone experience with Galaxy AI.',
    price: 1339,
    image: '/assets/samsung.png',
    category: 'Phones',
    features: ['Galaxy AI', 'S Pen Included', '200MP Camera', 'Snapdragon 8 Gen 3']
  },
  {
    name: 'Berlin Vision Max',
    description: 'Next-generation spatial computing with immersion like never before.',
    price: 3499,
    image: '/assets/vr.png',
    category: 'Metaverse',
    features: ['4K Micro-OLED', 'Spatial Audio', 'Dual Chip Design', 'Eye & Hand Tracking']
  },
  {
    name: 'Pro Tech Earbuds',
    description: 'Crystal clear sound with adaptive noise cancellation.',
    price: 279,
    image: '/assets/earbuds.png',
    category: 'Audio',
    features: ['Active Noise Cancellation', 'Adaptive Audio', '6h Battery', 'Touch Control']
  },
  {
    name: 'Pixel Watch Pro',
    description: 'The best of Google and Fitbit, perfectly balanced.',
    price: 399,
    image: '/assets/pixel.png',
    category: 'Wearables',
    features: ['Always-on Display', 'ECG Monitoring', 'Fall Detection', '4G LTE']
  },
  {
    name: 'Smart Home Hub',
    description: 'The heart of your modern Berlin home automation.',
    price: 199,
    image: '/assets/hub.png',
    category: 'Smart Home',
    features: ['10-inch Touchscreen', 'Built-in Zigbee', 'Video Calling', 'Privacy Shutter']
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
