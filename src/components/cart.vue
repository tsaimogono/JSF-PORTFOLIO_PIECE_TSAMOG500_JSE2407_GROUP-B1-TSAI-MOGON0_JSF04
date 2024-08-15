<template>
  <div>
    <div v-if="loading" class="text-center text-lg font-bold">Loading...</div>
    <div v-else>
      <div class="mb-4 text-center">
        <button @click="clearCart" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">Clear Cart</button>
      </div>

      <div v-if="cart.length === 0" class="text-center text-lg font-bold">Your cart is empty</div>

      <div v-else>
        <div v-for="item in cart" :key="item.id" class="flex items-center justify-between border-b py-4">
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
import jwtDecode from 'jwt-decode';

export default {
  setup() {
    const cart = ref([]);
    const loading = ref(true);

    const getCartFromLocalStorage = () => {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const { userId, items } = JSON.parse(cartData);
        // Ensure the cart is for the logged-in user
        if (userId === getCurrentUserId()) {
          cart.value = items;
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
          localStorage.setItem('cart', JSON.stringify({ userId, items: cart.value }));
        }
      }
    };

    const addToCart = (product) => {
      const existingItem = cart.value.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.value.push({ ...product, quantity: 1 });
      }
      updateLocalStorage();
    };

    const removeFromCart = (item) => {
      cart.value = cart.value.filter(cartItem => cartItem.id !== item.id);
      updateLocalStorage();
    };

    const updateQuantity = (item) => {
      const existingItem = cart.value.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity = item.quantity;
        updateLocalStorage();
      }
    };

    const clearCart = () => {
      cart.value = [];
      updateLocalStorage();
    };

    const totalCost = computed(() => {
      return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    onMounted(() => {
      getCartFromLocalStorage();
      loading.value = false;
    });

    return {
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCost,
    };
  },
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
