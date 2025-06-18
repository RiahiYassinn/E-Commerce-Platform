import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { Sparkles, TrendingUp } from 'lucide-react';

interface FeaturedSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ products, onAddToCart, onProductClick }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-25 to-rose-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-sm font-medium text-pink-700 mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending Now
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Featured 
            <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of trending pieces that define contemporary fashion
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
            <Sparkles className="h-5 w-5 mr-2" />
            View All Products
          </button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default FeaturedSection;