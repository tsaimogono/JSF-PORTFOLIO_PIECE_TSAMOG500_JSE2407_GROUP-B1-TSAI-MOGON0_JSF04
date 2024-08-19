
import { ref, computed } from 'vue';
import * as jwtDecode from 'jwt-decode'; // Use named import

// Reactive states
export const cart = ref([]);
export const wishlist = ref([]);
export const comparisonList = ref([]);
export const isLoggedIn = ref(false);
export const filteredProducts = ref([]);

// Utility function to get current user ID from JWT
const getCurrentUserId = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decodedToken = jwtDecode(token); // Use named import
    return decodedToken.userId;
  }
  return null;
};

// Synchronize with local storage
const updateCartInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('cart', JSON.stringify({ userId, items: cart.value }));
  }
};

const updateWishlistInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('wishlist', JSON.stringify({ userId, items: wishlist.value }));
  }
};

const updateComparisonListInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('comparisonList', JSON.stringify({ userId, items: comparisonList.value }));
  }
};

// Load from local storage
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

  const comparisonListData = localStorage.getItem('comparisonList');
  if (comparisonListData) {
    const { userId, items } = JSON.parse(comparisonListData);
    if (userId === getCurrentUserId()) {
      comparisonList.value = items;
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

// Actions to modify comparison list
export const addToComparisonList = (product) => {
  if (comparisonList.value.length >= 2) {
    alert('You can only compare up to 2 items.'); // Limit to 3 items for comparison
    return;
  }
  if (!comparisonList.value.find(item => item.id === product.id)) {
    comparisonList.value.push(product);
    updateComparisonListInLocalStorage();
  }
};

export const removeFromComparisonList = (productId) => {
  comparisonList.value = comparisonList.value.filter(item => item.id !== productId);
  updateComparisonListInLocalStorage();
};

export const clearComparisonList = () => {
  comparisonList.value = [];
  updateComparisonListInLocalStorage();
};

// Load data on initialization
loadCartAndWishlistFromLocalStorage();

// Computed properties
export const cartCount = computed(() => cart.value.length);
export const totalCartCost = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
export const comparisonListCount = computed(() => comparisonList.value.length);
