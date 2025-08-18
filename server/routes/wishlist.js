import express from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get wishlist for current user
router.get('/', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).populate('wishlist');
  res.json(user?.wishlist ?? []);
});

// Add product to wishlist
router.post('/:productId', requireAuth, async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!user.wishlist.some((id) => id.toString() === productId)) {
    user.wishlist.push(productId);
    await user.save();
  }
  res.json({ ok: true });
});

// Remove product from wishlist
router.delete('/:productId', requireAuth, async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();
  res.json({ ok: true });
});

export default router;

