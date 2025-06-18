import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface HeaderProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, onCategoryChange, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();

  const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Accessories'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                Bella
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className="relative text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium py-2 px-4 rounded-full hover:bg-pink-50 group"
                >
                  {category}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="block w-full pl-12 pr-4 py-3 border border-pink-200 rounded-2xl leading-5 bg-white/70 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                  placeholder="Search for clothes..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-3 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-300 hover:scale-110">
                <Heart className="h-6 w-6" />
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => authState.isAuthenticated ? setShowUserMenu(!showUserMenu) : setIsAuthModalOpen(true)}
                  className="p-3 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-300 hover:scale-110 flex items-center space-x-2"
                >
                  <User className="h-6 w-6" />
                  {authState.isAuthenticated && (
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {authState.user?.name}
                    </span>
                  )}
                </button>

                {/* User Dropdown */}
                {showUserMenu && authState.isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-pink-100 py-2 animate-fadeInUp">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{authState.user?.name}</p>
                      <p className="text-sm text-gray-500">{authState.user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onCartClick}
                className="p-3 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-300 hover:scale-110 relative group"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse">
                    {cartState.itemCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-300" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-12 pr-4 py-3 border border-pink-200 rounded-2xl leading-5 bg-white/70 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm"
                placeholder="Search for clothes..."
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-pink-100 bg-white/90 backdrop-blur-md animate-slideDown">
            <nav className="px-4 py-4 space-y-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 rounded-xl transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;