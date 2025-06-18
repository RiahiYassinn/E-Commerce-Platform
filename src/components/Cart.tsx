import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state: cartState, removeFromCart, updateQuantity } = useCart();
  const { state: authState } = useAuth();

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-white to-purple-50 shadow-2xl animate-slideInRight">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-3 text-pink-600" />
              Shopping Cart
              <span className="ml-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm px-3 py-1 rounded-full">
                {cartState.itemCount}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-pink-100 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {!authState.isAuthenticated ? (
              <div className="text-center py-16 animate-fadeInUp">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-12 w-12 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Please sign in</h3>
                <p className="text-gray-500 mb-6">Sign in to view your cart and save items</p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            ) : cartState.items.length === 0 ? (
              <div className="text-center py-16 animate-fadeInUp">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-12 w-12 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some beautiful items to get started</p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartState.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 bg-white rounded-2xl p-4 shadow-lg border border-pink-100 animate-fadeInUp hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {item.color}
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {item.size}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-pink-600 mt-2">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-3">
                      <div className="flex items-center bg-gray-100 rounded-xl">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-pink-100 rounded-l-xl transition-colors duration-200"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="text-lg font-semibold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-pink-100 rounded-r-xl transition-colors duration-200"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 hover:bg-red-100 text-red-500 rounded-xl transition-all duration-200 hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {authState.isAuthenticated && cartState.items.length > 0 && (
            <div className="border-t border-pink-100 p-6 space-y-6 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${cartState.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-pink-200 pt-3">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total:</span>
                    <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      ${cartState.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClose}
                  className="w-full border-2 border-pink-200 text-gray-700 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:border-pink-300 transition-all duration-300 font-semibold"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-white rounded-xl p-3">
                <Gift className="h-4 w-4 text-pink-500" />
                <span>Free gift wrapping on orders over $100</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;