import React from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2 border border-pink-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
          onClick={() => onProductClick(product)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-50 hover:scale-110 transform translate-y-2 group-hover:translate-y-0">
          <Heart className="h-5 w-5 text-gray-400 hover:text-pink-500 transition-colors duration-200" />
        </button>
        
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
            Sale
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg backdrop-blur-sm flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1 font-medium">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </div>
        </div>
        
        <h3 
          className="text-xl font-bold text-gray-900 mb-3 cursor-pointer hover:text-pink-600 transition-colors duration-200 line-clamp-2"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {product.originalPrice && (
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-xs text-gray-600 font-medium">+{product.colors.length - 4}</span>
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full font-medium">
            {product.sizes.length} sizes
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;