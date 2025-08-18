import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['Men', 'Women', 'Accessories'], required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    sizes: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },
    brand: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);

