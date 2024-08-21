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

    /**
     * Computed property to get the items in the shopping cart.
     * @returns {Array} List of items in the cart.
     */
    const cartItems = computed(() => cartStore.items);

    /**
     * Computed property to calculate the total cost of items in the cart.
     * @returns {number} Total cost of the items in the cart.
     */
    const totalCost = computed(() => {
      return cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    /**
     * Clears all items from the shopping cart.
     * Syncs the cart data with local storage after clearing.
     */
    const clearCart = () => {
      cartStore.items = [];
      cartStore.updateLocalStorage(); // Sync with localStorage
    };

    /**
     * Removes a specific item from the shopping cart.
     * @param {Object} item - The item to be removed from the cart.
     */
    const removeFromCart = (item) => {
      cartStore.items = cartStore.items.filter(cartItem => cartItem.id !== item.id);
      cartStore.updateLocalStorage(); // Sync with localStorage
    };

    /**
     * Updates the quantity of a specific item in the shopping cart.
     * Syncs the updated quantity with local storage.
     * @param {Object} item - The item whose quantity is being updated.
     */
    const updateQuantity = (item) => {
      cartStore.updateLocalStorage(); // Sync with localStorage
    };

    /**
     * Loads the cart data from local storage when the component is mounted.
     * Sets the loading state to false once the cart data is loaded.
     */
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
