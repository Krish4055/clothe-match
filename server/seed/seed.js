import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swipefit';

async function main() {
  await mongoose.connect(mongoUri);
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log('Products already seeded. Count:', count);
    process.exit(0);
  }
  const docs = [
    {
      name: 'Classic Black T-Shirt',
      price: 29.99,
      image: '/src/assets/tshirt-1.jpg',
      category: 'Men',
      description: 'Comfortable cotton blend t-shirt perfect for everyday wear',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      brand: 'StyleCo',
    },
    {
      name: 'Premium White Dress Shirt',
      price: 79.99,
      image: '/src/assets/shirt-1.jpg',
      category: 'Men',
      description: 'Elegant dress shirt made from premium cotton',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      brand: 'FormalWear',
    },
    {
      name: 'Modern Slim Jeans',
      price: 89.99,
      image: '/src/assets/jeans-1.jpg',
      category: 'Men',
      description: 'Stylish slim-fit jeans with premium denim',
      sizes: ['28', '30', '32', '34', '36'],
      inStock: true,
      brand: 'DenimCo',
    },
    {
      name: 'Elegant Evening Dress',
      price: 149.99,
      image: '/src/assets/dress-1.jpg',
      category: 'Women',
      description: 'Beautiful evening dress perfect for special occasions',
      sizes: ['XS', 'S', 'M', 'L'],
      inStock: true,
      brand: 'ElegantWear',
    },
    {
      name: 'Luxury Leather Handbag',
      price: 199.99,
      image: '/src/assets/bag-1.jpg',
      category: 'Accessories',
      description: 'Premium leather handbag with modern design',
      sizes: [],
      inStock: true,
      brand: 'LuxuryBags',
    },
    {
      name: 'Casual Summer Top',
      price: 39.99,
      image: '/src/assets/tshirt-1.jpg',
      category: 'Women',
      description: 'Light and comfortable summer top',
      sizes: ['XS', 'S', 'M', 'L'],
      inStock: true,
      brand: 'SummerStyle',
    },
  ];

  await Product.insertMany(docs);
  console.log('Seeded products:', docs.length);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

