<template>
    <div v-if="isLoggedIn">
      <h2 class="text-center text-lg font-bold mb-4">Comparison List</h2>
  
      <div v-if="comparisonItems.length === 0" class="text-center">
        Your comparison list is empty.
      </div>
      <div v-else>
        <button @click="clearComparison" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mb-4">
          Clear Comparison
        </button>
  
        <table class="w-full border overflow-auto">
          <thead>
            <tr>
              <th v-for="(item, index) in comparisonItems" :key="index" class="border px-2 py-1">
                Product {{ index + 1 }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="item in comparisonItems" :key="item.id" class="border px-2 py-1">
                <img :src="item.image" :alt="item.title" class="w-32 h-32 object-cover mx-auto mb-2" />
              </td>
            </tr>
            <tr>
              <td v-for="item in comparisonItems" :key="item.id" class="border px-2 py-1">{{ item.title }}</td>
            </tr>
            <tr>
              <td v-for="item in comparisonItems" :key="item.id" class="border px-2 py-1">{{ item.price | currency }}</td>
            </tr>
            <tr>
              <td v-for="item in comparisonItems" :key="item.id" class="border px-2 py-1">{{ item.rating.rate }} / 5</td>
            </tr>
            <tr>
              <td v-for="item in comparisonItems" :key="item.id" class="border px-2 py-1">{{ item.description }}</td>
            </tr>
            <tr>
              <td v-for="item in comparisonItems" :key="item.id" class="border px-2 py-1">
                <button @click="removeFromComparison(item.id)" class="text-red-600 hover:underline">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="text-center">Please log in to access your comparison list.</div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import {
    comparisonList,
    removeFromComparisonList,
    clearComparisonList,
    isLoggedIn,
    maxComparisonItems,
  } from '../stores'; // Ensure correct path
  
  export default {
    setup() {
      const comparisonItems = computed(() => comparisonList.value);
      const loggedIn = computed(() => isLoggedIn.value);
  
      const removeFromComparison = (productId) => {
        removeFromComparisonList(productId);
      };
  
      const clearComparison = () => {
        clearComparisonList();
      };
  
      return {
        comparisonItems,
        isLoggedIn: loggedIn,
        removeFromComparison,
        clearComparison,
        maxComparisonItems,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Ensure the table is responsive */
  table {
    max-width: 100%;
    overflow-x: auto;
  }
  
  td img {
    max-width: 100%;
  }
  </style>
  