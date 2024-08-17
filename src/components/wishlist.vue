<template>
    <div>
      <div v-if="loading" class="text-center text-lg font-bold">Loading...</div>
      <div v-else>
        <div v-if="wishlist.length === 0" class="text-center text-lg font-bold">Your wishlist is empty</div>
  
        <div v-else>
          <div v-for="item in wishlist" :key="item.id" class="flex items-center justify-between border-b py-4">
            <div class="flex items-center">
              <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover mr-4" />
              <div>
                <h3 class="font-semibold">{{ item.title }}</h3>
                <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <button @click="addToCart(item)" class="mr-4 text-green-600 hover:underline">Add to Cart</button>
              <button @click="removeFromWishlist(item)" class="text-red-600 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import {jwtDecode} from 'jwt-decode';
  
  export default {
    setup() {
      const wishlist = ref([]);
      const loading = ref(true);
  
      const getWishlistFromLocalStorage = () => {
        const wishlistData = localStorage.getItem('wishlist');
        if (wishlistData) {
          const { userId, items } = JSON.parse(wishlistData);
          // Ensure the wishlist is for the logged-in user
          if (userId === getCurrentUserId()) {
            wishlist.value = items;
          }
        }
      };
  
      const getCurrentUserId = () => {
        const token = localStorage.getItem('jwt');
        if (token) {
          const decodedToken = jwtDecode(token);
          return decodedToken.userId;
        }
        return null;
      };
  
      const updateLocalStorage = () => {
        const token = localStorage.getItem('jwt');
        if (token) {
          const userId = getCurrentUserId();
          if (userId) {
            localStorage.setItem('wishlist', JSON.stringify({ userId, items: wishlist.value }));
          }
        }
      };
  
      const addToCart = (product) => {
        const cartData = localStorage.getItem('cart');
        const cartItems = cartData ? JSON.parse(cartData).items : [];
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartItems.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify({ userId: getCurrentUserId(), items: cartItems }));
      };
  
      const removeFromWishlist = (item) => {
        wishlist.value = wishlist.value.filter(wishlistItem => wishlistItem.id !== item.id);
        updateLocalStorage();
      };
  
      onMounted(() => {
        getWishlistFromLocalStorage();
        loading.value = false;
      });
  
      return {
        wishlist,
        loading,
        addToCart,
        removeFromWishlist,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  