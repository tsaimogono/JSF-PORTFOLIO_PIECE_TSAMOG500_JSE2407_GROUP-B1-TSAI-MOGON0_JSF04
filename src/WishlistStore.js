// src/stores/wishlistStore.js
import { defineStore } from 'pinia';
import { useCartStore } from './cartStore'; // Import the cart store if it exists

/**
 * Pinia store for managing wishlist operations.
 * 
 * @module useWishlistStore
 */
export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    /**
     * List of items in the wishlist.
     * 
     * @type {Array<Object>}
     */
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
  }),
  actions: {
    /**
     * Add a product to the wishlist if it is not already present.
     * 
     * @param {Object} product - The product to add to the wishlist.
     */
    addToWishlist(product) {
      const index = this.items.findIndex(item => item.id === product.id);
      if (index === -1) {
        this.items.push(product);
        localStorage.setItem('wishlist', JSON.stringify(this.items));
      }
    },

    /**
     * Remove a product from the wishlist by its ID.
     * 
     * @param {number} productId - The ID of the product to remove from the wishlist.
     */
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },

    /**
     * Clear all items from the wishlist.
     */
    clearWishlist() {
      this.items = [];
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },

    /**
     * Add a product to the cart and remove it from the wishlist.
     * 
     * @param {Object} product - The product to add to the cart.
     */
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product);
      this.removeFromWishlist(product.id);
    },
  },
  getters: {
    /**
     * Get the total number of items in the wishlist.
     * 
     * @type {number}
     */
    wishlistCount: (state) => state.items.length,
  },
});
