export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'accessories';
  description: string;
  sizes?: string[];
  colors?: string[];
  brand: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Black T-Shirt',
    price: 29.99,
    image: '/src/assets/tshirt-1.jpg',
    category: 'men',
    description: 'Comfortable cotton blend t-shirt perfect for everyday wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    brand: 'StyleCo'
  },
  {
    id: '2',
    name: 'Premium White Dress Shirt',
    price: 79.99,
    image: '/src/assets/shirt-1.jpg',
    category: 'men',
    description: 'Elegant dress shirt made from premium cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue'],
    brand: 'FormalWear'
  },
  {
    id: '3',
    name: 'Modern Slim Jeans',
    price: 89.99,
    image: '/src/assets/jeans-1.jpg',
    category: 'men',
    description: 'Stylish slim-fit jeans with premium denim',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    brand: 'DenimCo'
  },
  {
    id: '4',
    name: 'Elegant Evening Dress',
    price: 149.99,
    image: '/src/assets/dress-1.jpg',
    category: 'women',
    description: 'Beautiful evening dress perfect for special occasions',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Burgundy'],
    brand: 'ElegantWear'
  },
  {
    id: '5',
    name: 'Luxury Leather Handbag',
    price: 199.99,
    image: '/src/assets/bag-1.jpg',
    category: 'accessories',
    description: 'Premium leather handbag with modern design',
    colors: ['Brown', 'Black', 'Tan'],
    brand: 'LuxuryBags'
  },
  {
    id: '6',
    name: 'Casual Summer Top',
    price: 39.99,
    image: '/src/assets/tshirt-1.jpg',
    category: 'women',
    description: 'Light and comfortable summer top',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Pink', 'Mint'],
    brand: 'SummerStyle'
  }
];

export const categories = [
  { id: 'men', name: 'Men', icon: '👔' },
  { id: 'women', name: 'Women', icon: '👗' },
  { id: 'accessories', name: 'Accessories', icon: '👜' }
];