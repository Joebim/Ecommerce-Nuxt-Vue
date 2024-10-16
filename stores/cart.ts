// stores/cart.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem } from '~/types';

export const useCartStore = defineStore('cart', () => {
  // State
  const cart = ref<CartItem[]>([]);

  // Initialize cart from localStorage
  const loadCart = () => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        cart.value = JSON.parse(storedCart);
      }
    }
  };

  // Persist cart to localStorage
  const saveCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart.value));
    }
  };

  // Getters
  const totalItems = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0));
  const totalPrice = computed(() => cart.value.reduce((total, item) => total + item.price * item.quantity, 0));

  // Actions
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    saveCart();
  };

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter(item => item.id !== productId);
    saveCart();
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cart.value.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        saveCart();
      }
    }
  };

  const clearCart = () => {
    cart.value = [];
    saveCart();
  };

  // Load the cart when the store is initialized
  loadCart();

  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}, {
  persist: {
    storage: persistedState.localStorage,
  },
});
