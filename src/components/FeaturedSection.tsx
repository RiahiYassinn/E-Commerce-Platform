import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface FeaturedSectionProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onAddToCart, onProductClick }) => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of trending pieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;