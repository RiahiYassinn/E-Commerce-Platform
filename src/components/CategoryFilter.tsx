import React from 'react';
import { categories } from '../data/products';
import { Filter, Grid } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-3xl shadow-lg border border-pink-100 sticky top-24">
      <div className="flex items-center mb-6">
        <Filter className="h-6 w-6 text-pink-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Categories</h3>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => onCategoryChange('All')}
          className={`group w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === 'All'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600'
          }`}
        >
          <div className="flex items-center">
            <Grid className="h-5 w-5 mr-3" />
            <span className="font-medium">All Products</span>
          </div>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.name)}
            className={`group w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.name
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{category.name}</span>
              <div className="w-2 h-2 bg-current rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-sm opacity-75 mt-1">
              {category.subcategories.slice(0, 2).join(', ')}
              {category.subcategories.length > 2 && '...'}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
        <h4 className="font-semibold text-gray-900 mb-2">Special Offer</h4>
        <p className="text-sm text-gray-700 mb-3">Get 20% off on your first order!</p>
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-xl text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
          Claim Now
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;