<!-- src/views/Wishlist.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">My Wishlist ({{ wishlistCount }})</h1>
    <div v-if="wishlistCount > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in wishlistItems" :key="item.id" class="text-center border border-gray-300 p-4 m-4 rounded-lg max-w-lg w-full">
        <img :src="item.image" :alt="item.title" class="w-full h-auto rounded-lg mb-4" />
        <h2 class="text-2xl font-bold mb-2">{{ item.title }}</h2>
        <p class="mb-2">{{ item.description }}</p>
        <p class="mb-2">Category: {{ item.category }}</p>
        <p class="mb-2">Price: ${{ item.price.toFixed(2) }}</p>
        <p class="mb-4">Rating: {{ item.rating.rate }} ({{ item.rating.count }} reviews)</p>
        <button @click="removeFromWishlist(item.id)" class="bg-red-500 text-white py-2 px-4 rounded">Remove</button>
        <button @click="addToCart(item)" class="ml-2 bg-blue-800 text-white py-2 px-4 rounded">Add to Cart</button>
      </div>
    </div>
    <div v-else class="text-gray-500">Your wishlist is empty.</div>
    <button @click="clearWishlist" v-if="wishlistCount > 0" class="mt-4 bg-red-500 text-white py-2 px-4 rounded">Clear Wishlist</button>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useWishlistStore } from '../WishlistStore';

export default {
  setup() {
    const wishlistStore = useWishlistStore();
    const sortOption = ref('price-asc');
    const selectedCategory = ref('');

    const categories = computed(() => {
      const allCategories = wishlistStore.items.map(item => item.category);
      return [...new Set(allCategories)];
    });

    const filteredWishlist = computed(() => {
      let filtered = wishlistStore.items;

      if (selectedCategory.value) {
        filtered = filtered.filter(item => item.category === selectedCategory.value);
      }

      switch (sortOption.value) {
        case 'price-asc':
          filtered = filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered = filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered = filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
      }

      return filtered;
    });

    const filterWishlist = () => {
      // Filtering logic is handled within the computed property.
    };

    const sortWishlist = () => {
      // Sorting logic is handled within the computed property.
    };

    return {
      wishlistItems: computed(() => wishlistStore.items),
      wishlistCount: computed(() => wishlistStore.wishlistCount),
      removeFromWishlist: wishlistStore.removeFromWishlist,
      clearWishlist: wishlistStore.clearWishlist,
      addToCart: wishlistStore.addToCart,
      sortOption,
      selectedCategory,
      categories,
      filteredWishlist,
    };
  },
};
</script>