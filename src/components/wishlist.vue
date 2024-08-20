<!-- src/views/Wishlist.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">My Wishlist ({{ wishlistCount }})</h1>
    <div v-if="wishlistCount > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in wishlistItems" :key="item.id" class="bg-white p-4 rounded-lg shadow">
        <img :src="item.image" class="h-40 w-full object-contain mb-2" />
        <h2 class="text-lg font-semibold">{{ item.title }}</h2>
        <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
        <button @click="removeFromWishlist(item.id)" class="text-red-500 mt-2">Remove</button>
        <button @click="addToCart(item)" class="bg-green-500 text-white mt-2 p-2 rounded">Add to Cart</button>
      </div>
    </div>
    <div v-else class="text-gray-500">Your wishlist is empty.</div>
    <button @click="clearWishlist" v-if="wishlistCount > 0" class="mt-4 bg-red-500 text-white py-2 px-4 rounded">Clear Wishlist</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useWishlistStore } from '../WishlistStore';

export default {
  setup() {
    const wishlistStore = useWishlistStore();

    return {
      wishlistItems: computed(() => wishlistStore.items),
      wishlistCount: computed(() => wishlistStore.wishlistCount),
      removeFromWishlist: wishlistStore.removeFromWishlist,
      clearWishlist: wishlistStore.clearWishlist,
      addToCart: wishlistStore.addToCart,
    };
  },
};
</script>
