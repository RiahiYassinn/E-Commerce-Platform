import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';
import { Product } from './types';

const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { state: authState } = useAuth();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static data if backend is not available
        const { products: staticProducts } = await import('./data/products');
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleAddToCart = async (product: Product) => {
    if (!authState.isAuthenticated) {
      alert('Please sign in to add items to cart');
      return;
    }

    try {
      await addToCart(product, product.sizes[0], product.colors[0]);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart');
    }
  };

  const handleShopNow = () => {
    setShowAllProducts(true);
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading beautiful products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-rose-50">
      <Header
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {!showAllProducts ? (
        <>
          <Hero onShopNow={handleShopNow} />
          <FeaturedSection
            products={products.filter(p => p.featured)}
            onAddToCart={handleAddToCart}
            onProductClick={setSelectedProduct}
          />
        </>
      ) : null}

      <section id="products-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                  </h2>
                  <p className="text-gray-600">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select className="bg-white border border-pink-200 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 animate-fadeInUp">
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fadeInUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onProductClick={setSelectedProduct}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;