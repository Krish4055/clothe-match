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

