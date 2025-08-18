import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, q } = req.query;
    const filter = {};
    if (category && ['Men', 'Women', 'Accessories'].includes(String(category))) {
      filter.category = category;
    }
    if (q) {
      filter.$or = [
        { name: { $regex: String(q), $options: 'i' } },
        { description: { $regex: String(q), $options: 'i' } },
      ];
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ data: products, total });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: 'Invalid id' });
  }
});

// POST /api/products (optional admin)
router.post('/', async (req, res) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create product', error: String(e) });
  }
});

export default router;

