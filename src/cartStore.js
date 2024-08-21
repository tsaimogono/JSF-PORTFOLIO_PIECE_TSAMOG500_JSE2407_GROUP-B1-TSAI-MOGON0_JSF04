import { defineStore } from 'pinia';

/**
 * Pinia store for managing the shopping cart.
 * 
 * @module useCartStore
 */
export const useCartStore = defineStore('cart', {
  state: () => ({
    /**
     * Array of cart items. Each item is an object with product details and quantity.
     * @type {Array<Object>}
     * @property {number} id - Product ID.
     * @property {string} title - Product title.
     * @property {string} image - Product image URL.
     * @property {string} category - Product category.
     * @property {number} price - Product price.
     * @property {number} quantity - Quantity of the product in the cart.
     */
    items: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  actions: {
    /**
     * Adds a product to the cart. If the product is already in the cart, it increases the quantity by 1.
     * Updates the cart in local storage.
     * 
     * @param {Object} product - The product to add to the cart.
     * @param {number} product.id - Product ID.
     * @param {string} product.title - Product title.
     * @param {string} product.image - Product image URL.
     * @param {string} product.category - Product category.
     * @param {number} product.price - Product price.
     */
    addToCart(product) {
      const index = this.items.findIndex(item => item.id === product.id);
      if (index !== -1) {
        this.items[index].quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    /**
     * Loads the cart from local storage and updates the store's state.
     * If no cart data is found in local storage, initializes an empty cart.
     */
    loadCart() {
      this.items = JSON.parse(localStorage.getItem('cart')) || [];
    },
  },
  getters: {
    /**
     * Computes the total count of items in the cart by summing the quantities of all items.
     * 
     * @returns {number} The total count of items in the cart.
     */
    cartCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    /**
     * Computes the total cost of items in the cart by summing the product of price and quantity for each item.
     * 
     * @returns {number} The total cost of items in the cart.
     */
    totalCost: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
});
