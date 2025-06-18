import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const products = [
  {
    name: 'Elegant Summer Maxi Dress',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Dresses',
    subcategory: 'Maxi',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'
    ],
    description: 'A flowing maxi dress perfect for summer occasions. Made from lightweight, breathable fabric with a flattering silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Coral', 'White'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    name: 'Classic White Button-Up Blouse',
    price: 49.99,
    category: 'Tops',
    subcategory: 'Blouses',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
    images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'],
    description: 'A timeless white blouse that pairs perfectly with any outfit. Crisp cotton fabric with mother-of-pearl buttons.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue'],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 89
  },
  {
    name: 'High-Waisted Skinny Jeans',
    price: 79.99,
    category: 'Bottoms',
    subcategory: 'Jeans',
    image: 'https://images.pexels.com/photos/7679470/pexels-photo-7679470.jpeg',
    images: ['https://images.pexels.com/photos/7679470/pexels-photo-7679470.jpeg'],
    description: 'Comfortable high-waisted skinny jeans with stretch denim. Perfect fit with excellent shape retention.',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Dark Blue', 'Black', 'Light Wash'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 156
  },
  {
    name: 'Leather Crossbody Bag',
    price: 129.99,
    category: 'Accessories',
    subcategory: 'Bags',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    images: ['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg'],
    description: 'Genuine leather crossbody bag with adjustable strap. Multiple compartments for organization.',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 67
  },
  {
    name: 'Floral Print Midi Dress',
    price: 69.99,
    category: 'Dresses',
    subcategory: 'Casual',
    image: 'https://images.pexels.com/photos/8148579/pexels-photo-8148579.jpeg',
    images: ['https://images.pexels.com/photos/8148579/pexels-photo-8148579.jpeg'],
    description: 'Beautiful midi dress with delicate floral print. Perfect for brunch dates or casual outings.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink Floral', 'Blue Floral'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 43
  },
  {
    name: 'Cozy Knit Sweater',
    price: 59.99,
    category: 'Tops',
    subcategory: 'Sweaters',
    image: 'https://images.pexels.com/photos/7679470/pexels-photo-7679470.jpeg',
    images: ['https://images.pexels.com/photos/7679470/pexels-photo-7679470.jpeg'],
    description: 'Soft and cozy knit sweater perfect for cooler weather. Relaxed fit with ribbed cuffs and hem.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Dusty Rose', 'Sage Green'],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 78
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bella-ecommerce');
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(products);
    
    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();