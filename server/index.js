import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import wishlistRouter from './routes/wishlist.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// Database with in-memory fallback
async function connectDb() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swipefit';
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected:', mongoUri);
  } catch (err) {
    console.warn('MongoDB connection failed, starting in-memory MongoDB...');
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri);
    console.log('In-memory MongoDB connected');
  }

  // Auto-seed if empty
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: 'Classic Black T-Shirt', category: 'Men', price: 29.99, image: 'https://via.placeholder.com/300?text=Black+Tee', description: 'Soft cotton tee in classic black', sizes: ['S','M','L','XL'], inStock: true, brand: 'StyleCo' },
      { name: 'Premium White Shirt', category: 'Men', price: 59.99, image: 'https://via.placeholder.com/300?text=White+Shirt', description: 'Crisp formal white shirt', sizes: ['S','M','L','XL'], inStock: true, brand: 'FormalWear' },
      { name: 'Slim Fit Jeans', category: 'Men', price: 79.99, image: 'https://via.placeholder.com/300?text=Slim+Jeans', description: 'Modern slim-fit denim', sizes: ['28','30','32','34','36'], inStock: true, brand: 'DenimCo' },
      { name: 'Evening Dress', category: 'Women', price: 129.99, image: 'https://via.placeholder.com/300?text=Evening+Dress', description: 'Elegant evening dress', sizes: ['XS','S','M','L'], inStock: true, brand: 'ElegantWear' },
      { name: 'Summer Top', category: 'Women', price: 39.99, image: 'https://via.placeholder.com/300?text=Summer+Top', description: 'Light and breezy top for summer', sizes: ['XS','S','M','L'], inStock: true, brand: 'SummerStyle' },
      { name: 'Leather Handbag', category: 'Accessories', price: 149.99, image: 'https://via.placeholder.com/300?text=Handbag', description: 'Premium leather handbag', sizes: ['One Size'], inStock: true, brand: 'LuxuryBags' },
      { name: 'Sunglasses', category: 'Accessories', price: 79.99, image: 'https://via.placeholder.com/300?text=Sunglasses', description: 'UV protection stylish sunglasses', sizes: ['One Size'], inStock: true, brand: 'SunCo' },
      { name: 'Analog Watch', category: 'Accessories', price: 199.99, image: 'https://via.placeholder.com/300?text=Watch', description: 'Classic analog wrist watch', sizes: ['One Size'], inStock: true, brand: 'TimeMaster' },
    ]);
    console.log('Auto-seeded sample products');
  }
}

// Routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/wishlist', wishlistRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

