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
    
          <button @click="resetFilters" class="ml-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">Reset Filters</button>
        </div>
    
        <div class="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div class="product-card border border-gray-200 p-4 text-center bg-white shadow-md rounded hover:shadow-lg transition-transform transform hover:-translate-y-1" v-for="product in filteredProducts" :key="product.id">
            <img :src="product.image" alt="Product Image" class="w-full h-48 object-contain mb-4" />
            <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
            <p class="text-gray-700 mb-2">{{ product.price | currency }}</p>
            <p class="text-gray-500 mb-4">{{ product.category }}</p>
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
              <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">View Details</button>
            </router-link>
            <button @click="addToCart(product)" class="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
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
        cart: [],
      };
    },
    computed: {
      cartCount() {
        return this.cart.length;
      },
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
        this.cart.push(product);
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