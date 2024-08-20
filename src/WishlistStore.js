// src/stores/wishlistStore.js
import { defineStore } from 'pinia';
import { useCartStore } from './cartStore'; // Import the cart store if it exists

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
  }),
  actions: {
    addToWishlist(product) {
      const index = this.items.findIndex(item => item.id === product.id);
      if (index === -1) {
        this.items.push(product);
        localStorage.setItem('wishlist', JSON.stringify(this.items));
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },
    clearWishlist() {
      this.items = [];
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product);
      this.removeFromWishlist(product.id);
    },
  },
  getters: {
    wishlistCount: (state) => state.items.length,
  },
});
