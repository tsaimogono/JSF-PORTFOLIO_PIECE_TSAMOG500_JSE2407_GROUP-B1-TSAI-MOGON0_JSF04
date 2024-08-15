<template>
    <div class="max-w-4xl mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">My Wishlist</h2>
      <div v-if="wishlist.length === 0" class="text-gray-500">Your wishlist is empty.</div>
      <div v-else>
        <ul class="space-y-4">
          <li v-for="item in wishlist" :key="item.id" class="flex items-center justify-between p-4 border border-gray-300 rounded">
            <div class="flex items-center">
              <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover mr-4" />
              <div>
                <h3 class="text-lg font-semibold">{{ item.name }}</h3>
                <p class="text-gray-700">${{ item.price }}</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="removeFromWishlist(item.id)" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Remove</button>
              <button @click="addToCart(item)" class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Add to Cart</button>
            </div>
          </li>
        </ul>
        <button @click="clearWishlist" class="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">Clear All</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { wishlist, cart } from '../stores';
  
  export default {
    setup() {
      const router = useRouter();
  
      const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.value.filter(item => item.id !== id);
        wishlist.value = updatedWishlist;
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      };
  
      const addToCart = (item) => {
        cart.value.push(item);
        localStorage.setItem('cart', JSON.stringify(cart.value));
      };
  
      const clearWishlist = () => {
        wishlist.value = [];
        localStorage.setItem('wishlist', JSON.stringify([]));
      };
  
      return {
        wishlist,
        cart,
        removeFromWishlist,
        addToCart,
        clearWishlist,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  