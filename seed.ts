import mongoose from 'mongoose';
import Product from './server/models/Product.js';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/swipefit';

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const products = [
      // Men
      { name: 'Classic Black T-Shirt', category: 'Men', price: 29.99, image: 'https://via.placeholder.com/300?text=Black+Tee', description: 'Soft cotton tee in classic black', sizes: ['S','M','L','XL'], inStock: true },
      { name: 'Premium White Shirt', category: 'Men', price: 59.99, image: 'https://via.placeholder.com/300?text=White+Shirt', description: 'Crisp formal white shirt', sizes: ['S','M','L','XL'], inStock: true },
      { name: 'Slim Fit Jeans', category: 'Men', price: 79.99, image: 'https://via.placeholder.com/300?text=Slim+Jeans', description: 'Modern slim-fit denim', sizes: ['28','30','32','34','36'], inStock: true },
      { name: 'Athletic Joggers', category: 'Men', price: 49.99, image: 'https://via.placeholder.com/300?text=Joggers', description: 'Comfortable joggers for daily wear', sizes: ['S','M','L','XL'], inStock: true },
      { name: 'Denim Jacket', category: 'Men', price: 99.99, image: 'https://via.placeholder.com/300?text=Denim+Jacket', description: 'Classic blue denim jacket', sizes: ['S','M','L','XL'], inStock: true },

      // Women
      { name: 'Evening Dress', category: 'Women', price: 129.99, image: 'https://via.placeholder.com/300?text=Evening+Dress', description: 'Elegant evening dress', sizes: ['XS','S','M','L'], inStock: true },
      { name: 'Summer Top', category: 'Women', price: 39.99, image: 'https://via.placeholder.com/300?text=Summer+Top', description: 'Light and breezy top for summer', sizes: ['XS','S','M','L'], inStock: true },
      { name: 'High-Waist Jeans', category: 'Women', price: 89.99, image: 'https://via.placeholder.com/300?text=High+Waist+Jeans', description: 'Flattering high-waist denim', sizes: ['24','26','28','30','32'], inStock: true },
      { name: 'Floral Skirt', category: 'Women', price: 49.99, image: 'https://via.placeholder.com/300?text=Floral+Skirt', description: 'Flowy floral print skirt', sizes: ['XS','S','M','L'], inStock: true },
      { name: 'Knitted Cardigan', category: 'Women', price: 69.99, image: 'https://via.placeholder.com/300?text=Cardigan', description: 'Cozy knitted cardigan', sizes: ['XS','S','M','L'], inStock: true },

      // Accessories
      { name: 'Leather Handbag', category: 'Accessories', price: 149.99, image: 'https://via.placeholder.com/300?text=Handbag', description: 'Premium leather handbag', sizes: ['One Size'], inStock: true },
      { name: 'Sunglasses', category: 'Accessories', price: 79.99, image: 'https://via.placeholder.com/300?text=Sunglasses', description: 'UV protection stylish sunglasses', sizes: ['One Size'], inStock: true },
      { name: 'Analog Watch', category: 'Accessories', price: 199.99, image: 'https://via.placeholder.com/300?text=Watch', description: 'Classic analog wrist watch', sizes: ['One Size'], inStock: true },
      { name: 'Beanie', category: 'Accessories', price: 24.99, image: 'https://via.placeholder.com/300?text=Beanie', description: 'Warm knit beanie', sizes: ['One Size'], inStock: true },
      { name: 'Leather Belt', category: 'Accessories', price: 34.99, image: 'https://via.placeholder.com/300?text=Belt', description: 'Genuine leather belt', sizes: ['S','M','L'], inStock: true },

      // More Men
      { name: 'Polo Shirt', category: 'Men', price: 44.99, image: 'https://via.placeholder.com/300?text=Polo', description: 'Casual polo shirt', sizes: ['S','M','L','XL'], inStock: true },
      { name: 'Chinos', category: 'Men', price: 69.99, image: 'https://via.placeholder.com/300?text=Chinos', description: 'Slim fit chinos', sizes: ['30','32','34','36'], inStock: true },

      // More Women
      { name: 'Blouse', category: 'Women', price: 54.99, image: 'https://via.placeholder.com/300?text=Blouse', description: 'Elegant office blouse', sizes: ['XS','S','M','L'], inStock: true },
      { name: 'Maxi Dress', category: 'Women', price: 119.99, image: 'https://via.placeholder.com/300?text=Maxi+Dress', description: 'Comfortable maxi dress', sizes: ['XS','S','M','L'], inStock: true },

      // More Accessories
      { name: 'Scarf', category: 'Accessories', price: 29.99, image: 'https://via.placeholder.com/300?text=Scarf', description: 'Soft woven scarf', sizes: ['One Size'], inStock: true },
    ];

    const created = await Product.insertMany(products);
    console.log(`Inserted ${created.length} products`);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();

