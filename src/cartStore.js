import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  actions: {
    addToCart(product) {
      const index = this.items.findIndex(item => item.id === product.id);
      if (index !== -1) {
        this.items[index].quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    loadCart() {
      this.items = JSON.parse(localStorage.getItem('cart')) || [];
    },
  },
  getters: {
    cartCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalCost: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
});
