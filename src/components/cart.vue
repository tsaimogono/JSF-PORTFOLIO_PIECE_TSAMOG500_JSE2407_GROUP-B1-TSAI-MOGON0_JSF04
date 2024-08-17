<template>
    <div>
      <div v-if="loading" class="text-center text-lg font-bold">Loading...</div>
      <div v-else>
        <div class="mb-4 text-center">
          <button @click="clearCart" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">Clear Cart</button>
        </div>
  
        <div v-if="cartItems.length === 0" class="text-center text-lg font-bold">Your cart is empty</div>
  
        <div v-else>
          <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between border-b py-4">
            <div class="flex items-center">
              <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover mr-4" />
              <div>
                <h3 class="font-semibold">{{ item.title }}</h3>
                <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
                <input type="number" v-model.number="item.quantity" min="1" class="w-16 mt-2 p-1 border border-gray-300 rounded" @change="updateQuantity(item)" />
              </div>
            </div>
            <button @click="removeFromCart(item)" class="text-red-600 hover:underline">Remove</button>
          </div>
  
          <div class="mt-4 text-right">
            <p class="font-bold">Total Cost: ${{ totalCost.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useCartStore } from '../cartStore'; // Adjust the path if needed
  
  export default {
    setup() {
      const cartStore = useCartStore();
      const loading = ref(true);
  
      // Computed property to get cart items from the store
      const cartItems = computed(() => cartStore.items);
  
      // Computed property to calculate total cost
      const totalCost = computed(() => {
        return cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      });
  
      // Function to clear the cart
      const clearCart = () => {
        cartStore.items = [];
        cartStore.updateLocalStorage(); // Sync with localStorage
      };
  
      // Function to remove item from cart
      const removeFromCart = (item) => {
        cartStore.items = cartStore.items.filter(cartItem => cartItem.id !== item.id);
        cartStore.updateLocalStorage(); // Sync with localStorage
      };
  
      // Function to update item quantity in cart
      const updateQuantity = (item) => {
        cartStore.updateLocalStorage(); // Sync with localStorage
      };
  
      // Load cart data from local storage on component mount
      onMounted(() => {
        cartStore.loadCart();
        loading.value = false;
      });
  
      return {
        cartItems,
        loading,
        clearCart,
        removeFromCart,
        updateQuantity,
        totalCost,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  