<template>
  <div>
    <div v-if="loading" class="text-center text-lg font-bold">Loading...</div>
    <div v-else>
      <div class="mb-4">
        <label for="category" class="mr-2">Filter by Category:</label>
        <select v-model="selectedCategory" @change="filterProducts" class="p-2 border border-gray-300 rounded">
          <option value="">All</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <label for="sorting" class="ml-4 mr-2">Sort by Price:</label>
        <select v-model="sorting" @change="handleSort" class="p-2 border border-gray-300 rounded">
          <option value="default">Default</option>
          <option value="low">Lowest to Highest</option>
          <option value="high">Highest to Lowest</option>
        </select>

        <button @click="resetFilters" class="ml-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-500">
          Reset Filters
        </button>
      </div>

      <div class="bg-gray-100 p-6">
        <div class="container mx-auto">
          <div class="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-card border border-gray-200 p-4 text-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow transform hover:-translate-y-2"
            >
              <img :src="product.image" alt="Product Image" class="w-full h-[15rem] object-contain mb-4" />
              <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
              <p class="text-gray-800 mb-2 font-bold">${{ product.price.toFixed(2) }}</p>
              <p class="text-gray-500 mb-4 text-sm">{{ product.category }}</p>
              <p class="mb-4">Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>

              <!-- Wishlist Button -->
              <button @click="toggleWishlist(product)" class="mr-5">
                <svg
                  :class="isInWishlist(product) ? 'fill-red-500' : 'text-red-500'"
                  class="h-6 w-6 hover:fill-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <div class="flex-col gap-2">
                <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
                  <button
                    class="bg-gray-800 text-white py-2 px-2 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    View Details
                  </button>
                </router-link>

                <button
                  @click="addToCart(product)"
                  class="mt-2 ml-3 bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-300 transition-colors focus:outline-none focus:ring-3 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>

                <!-- Add to Compare Button -->
                <button
                  @click="addToComparison(product)"
                  class="mt-2 bg-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-300 transition-colors focus:outline-none focus:ring-3 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  Add to Compare
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useCartStore } from '../cartStore'; // Adjusted path for cart store
import { useWishlistStore } from '../WishlistStore'; // Import wishlist store
import { addToComparisonList } from '../stores'; // Adjusted path for comparison list functions

export default {
  data() {
    return {
      products: [],
      originalProducts: [],
      filteredProducts: [],
      categories: [],
      selectedCategory: '',
      sorting: 'default',
      loading: true,
    };
  },
  methods: {
    async init() {
      this.loading = true;
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ]);
        this.products = productsResponse.data;
        this.originalProducts = [...this.products];
        this.filteredProducts = [...this.products];
        this.categories = categoriesResponse.data;
      } catch (error) {
        console.error('Error fetching products or categories:', error);
      } finally {
        this.loading = false;
      }
    },
    filterProducts() {
      if (this.selectedCategory) {
        this.filteredProducts = this.products.filter(
          product => product.category === this.selectedCategory
        );
      } else {
        this.filteredProducts = [...this.products];
      }
      this.sortProducts();
    },
    handleSort() {
      this.sortProducts();
    },
    sortProducts() {
      if (this.sorting === 'low') {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (this.sorting === 'high') {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      } else {
        this.filteredProducts = [...this.originalProducts];
        if (this.selectedCategory) {
          this.filteredProducts = this.filteredProducts.filter(
            product => product.category === this.selectedCategory
          );
        }
      }
    },
    resetFilters() {
      this.selectedCategory = '';
      this.sorting = 'default';
      this.filteredProducts = [...this.originalProducts];
    },
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product);
    },
    toggleWishlist(product) {
      const wishlistStore = useWishlistStore();
      if (this.isInWishlist(product)) {
        wishlistStore.removeFromWishlist(product.id);
      } else {
        wishlistStore.addToWishlist(product);
      }
    },
    isInWishlist(product) {
      const wishlistStore = useWishlistStore();
      return wishlistStore.items.some(item => item.id === product.id);
    },
    addToComparison(product) {
      addToComparisonList(product); // Use the function from comparisonStore.js
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
/* Tailwind CSS utility classes are used, so no additional CSS is needed */
</style>
