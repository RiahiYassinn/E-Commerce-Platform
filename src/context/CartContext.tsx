import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: { items: CartItem[]; total: number; itemCount: number } }
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; color: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, size: string, color: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.itemCount,
        isLoading: false
      };
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0 };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false
  });

  const { state: authState } = useAuth();

  const fetchCart = async () => {
    if (!authState.isAuthenticated) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('http://localhost:5000/api/cart');
      const cart = response.data;
      
      dispatch({
        type: 'SET_CART',
        payload: {
          items: cart.items.map((item: any) => ({
            id: item._id,
            product: {
              id: item.productData.id,
              name: item.productData.name,
              price: item.productData.price,
              image: item.productData.image,
              category: item.productData.category
            },
            quantity: item.quantity,
            size: item.size,
            color: item.color
          })),
          total: cart.total,
          itemCount: cart.itemCount
        }
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (product: Product, size: string, color: string) => {
    if (!authState.isAuthenticated) {
      throw new Error('Please login to add items to cart');
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        product,
        size,
        color,
        quantity: 1
      });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/update/${itemId}`, {
        quantity
      });
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:5000/api/cart/clear');
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  // Fetch cart when user logs in
  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [authState.isAuthenticated]);

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};