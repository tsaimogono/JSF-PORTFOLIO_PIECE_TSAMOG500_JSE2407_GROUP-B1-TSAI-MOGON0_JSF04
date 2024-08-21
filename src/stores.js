import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode'; // Use named import

// Reactive states
export const cart = ref([]); // Cart items
export const wishlist = ref([]); // Wishlist items
export const comparisonList = ref([]); // Comparison list items
export const isLoggedIn = ref(false); // User login status
export const filteredProducts = ref([]); // Filtered product list

/**
 * Utility function to get current user ID from JWT.
 * 
 * @returns {string|null} The user ID from the decoded JWT token, or null if no token is present.
 */
const getCurrentUserId = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decodedToken = jwtDecode(token); // Use named import
    return decodedToken.userId;
  }
  return null;
};

/**
 * Synchronize cart data with local storage.
 */
const updateCartInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('cart', JSON.stringify({ userId, items: cart.value }));
  }
};

/**
 * Synchronize wishlist data with local storage.
 */
const updateWishlistInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('wishlist', JSON.stringify({ userId, items: wishlist.value }));
  }
};

/**
 * Synchronize comparison list data with local storage.
 */
const updateComparisonListInLocalStorage = () => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem('comparisonList', JSON.stringify({ userId, items: comparisonList.value }));
  }
};

/**
 * Load cart, wishlist, and comparison list data from local storage.
 */
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

/**
 * Add a product to the cart or increase its quantity if already in the cart.
 * 
 * @param {Object} product - The product to add to the cart.
 */
export const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
  updateCartInLocalStorage();
};

/**
 * Remove a product from the cart by its ID.
 * 
 * @param {number} productId - The ID of the product to remove from the cart.
 */
export const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId);
  updateCartInLocalStorage();
};

/**
 * Update the quantity of a product in the cart.
 * 
 * @param {number} productId - The ID of the product.
 * @param {number} quantity - The new quantity of the product.
 */
export const updateCartQuantity = (productId, quantity) => {
  const item = cart.value.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    updateCartInLocalStorage();
  }
};

/**
 * Clear all items from the cart.
 */
export const clearCart = () => {
  cart.value = [];
  updateCartInLocalStorage();
};

// Actions to modify wishlist

/**
 * Add a product to the wishlist if not already present.
 * 
 * @param {Object} product - The product to add to the wishlist.
 */
export const addToWishlist = (product) => {
  if (!wishlist.value.find(item => item.id === product.id)) {
    wishlist.value.push(product);
    updateWishlistInLocalStorage();
  }
};

/**
 * Remove a product from the wishlist by its ID.
 * 
 * @param {number} productId - The ID of the product to remove from the wishlist.
 */
export const removeFromWishlist = (productId) => {
  wishlist.value = wishlist.value.filter(item => item.id !== productId);
  updateWishlistInLocalStorage();
};

// Actions to modify comparison list

/**
 * Add a product to the comparison list, limiting to a maximum of 2 items.
 * 
 * @param {Object} product - The product to add to the comparison list.
 */
export const addToComparisonList = (product) => {
  if (comparisonList.value.length >= 2) {
    alert('You can only compare up to 2 items.'); // Limit to 2 items for comparison
    return;
  }
  if (!comparisonList.value.find(item => item.id === product.id)) {
    comparisonList.value.push(product);
    updateComparisonListInLocalStorage();
  }
};

/**
 * Remove a product from the comparison list by its ID.
 * 
 * @param {number} productId - The ID of the product to remove from the comparison list.
 */
export const removeFromComparisonList = (productId) => {
  comparisonList.value = comparisonList.value.filter(item => item.id !== productId);
  updateComparisonListInLocalStorage();
};

/**
 * Clear all items from the comparison list.
 */
export const clearComparisonList = () => {
  comparisonList.value = [];
  updateComparisonListInLocalStorage();
};

// Load data on initialization
loadCartAndWishlistFromLocalStorage();

// Computed properties

/**
 * Computed property to get the total number of items in the cart.
 * 
 * @type {ComputedRef<number>}
 */
export const cartCount = computed(() => cart.value.length);

/**
 * Computed property to calculate the total cost of items in the cart.
 * 
 * @type {ComputedRef<number>}
 */
export const totalCartCost = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

/**
 * Computed property to get the total number of items in the comparison list.
 * 
 * @type {ComputedRef<number>}
 */
export const comparisonListCount = computed(() => comparisonList.value.length);
