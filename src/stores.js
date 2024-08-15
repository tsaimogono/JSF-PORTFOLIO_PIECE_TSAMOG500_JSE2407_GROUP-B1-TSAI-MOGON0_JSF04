import { ref, computed } from 'vue';
import jwtDecode from 'jwt-decode';

/**
 * @module stores
 * @description This module exports reactive states for managing the application state in Vue.
 * 
 * Stores include:
 * - `cart`: A ref for managing the user's shopping cart items.
 * - `wishlist`: A ref for managing the user's wishlist items.
 * - `isLoggedIn`: A ref for tracking the user's login state.
 * - `filteredProducts`: A ref for managing the list of products after filtering.
 */

/**
 * A reactive state for managing the items in the user's shopping cart.
 * 
 * @constant {Ref<Array>} cart - The cart store which holds an array of cart items.
 */
export const cart = ref([]);

/**
 * A reactive state for managing the items in the user's wishlist.
 * 
 * @constant {Ref<Array>} wishlist - The wishlist store which holds an array of wishlist items.
 */
export const wishlist = ref([]);

/**
 * A reactive state for tracking the user's login state.
 * 
 * @constant {Ref<boolean>} isLoggedIn - The login state store which holds a boolean value.
 */
export const isLoggedIn = ref(false);

/**
 * A reactive state for managing the list of products after filtering.
 * 
 * @constant {Ref<Array>} filteredProducts - The filteredProducts store which holds an array of filtered products.
 */
export const filteredProducts = ref([]);

// Utility functions to get the current user ID from JWT
const getCurrentUserId = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId;
  }
  return null;
};

// Synchronize cart with local storage
const updateCartInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('cart', JSON.stringify({ userId, items: cart.value }));
  }
};

// Synchronize wishlist with local storage
const updateWishlistInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('wishlist', JSON.stringify({ userId, items: wishlist.value }));
  }
};

// Load cart and wishlist from local storage
const loadCartAndWishlistFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    const { userId, items } = JSON.parse(cartData);
    if (userId === getCurrentUserId()) {
      cart.value = items;
    }
  }

  const wishlistData = localStorage.getItem('wishlist');
  if (wishlistData) {
    const { userId, items } = JSON.parse(wishlistData);
    if (userId === getCurrentUserId()) {
      wishlist.value = items;
    }
  }
};

// Actions to modify cart
export const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
  updateCartInLocalStorage();
};

export const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId);
  updateCartInLocalStorage();
};

export const updateCartQuantity = (productId, quantity) => {
  const item = cart.value.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    updateCartInLocalStorage();
  }
};

export const clearCart = () => {
  cart.value = [];
  updateCartInLocalStorage();
};

// Actions to modify wishlist
export const addToWishlist = (product) => {
  if (!wishlist.value.find(item => item.id === product.id)) {
    wishlist.value.push(product);
    updateWishlistInLocalStorage();
  }
};

export const removeFromWishlist = (productId) => {
  wishlist.value = wishlist.value.filter(item => item.id !== productId);
  updateWishlistInLocalStorage();
};

// Load data on initialization
loadCartAndWishlistFromLocalStorage();

// Computed properties
export const cartCount = computed(() => cart.value.length);
export const totalCartCost = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});
