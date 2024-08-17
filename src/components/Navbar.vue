<template>
  <nav class="bg-gray-900 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-bold">
        <router-link to="/" class="flex items-center">
          SwiftCart
        </router-link>
      </div>
      <div class="hidden md:flex space-x-4">
        <router-link to="/">Products</router-link>
        <router-link to="/wishlist">Wishlist ({{ wishlistCount }})</router-link>
        <router-link to="/cart">Cart ({{ cartCount }})</router-link>
        <template v-if="isLoggedIn">
          <button @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login">Login</router-link>
        </template>
      </div>
      <div class="md:hidden cursor-pointer" @click="toggleMenu">
        <span class="block w-6 h-0.5 bg-white mb-1"></span>
        <span class="block w-6 h-0.5 bg-white mb-1"></span>
        <span class="block w-6 h-0.5 bg-white"></span>
      </div>
    </div>
    <div v-if="isMenuOpen" class="md:hidden flex flex-col bg-gray-800 p-4 space-y-2">
      <router-link to="/">Products</router-link>
      <router-link to="/wishlist">Wishlist ({{ wishlistCount }})</router-link>
      <router-link to="/cart">Cart ({{ cartCount }})</router-link>
      <template v-if="isLoggedIn">
        <button @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../cartStore'; // Adjust path as needed

export default {
  setup() {
    const isMenuOpen = ref(false);
    const cartStore = useCartStore();
    const router = useRouter();

    // Computed properties to get cart count
    const cartCount = computed(() => cartStore.cartCount);

    // Toggle menu visibility
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    // Handle user logout
    const handleLogout = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
      cartStore.items = [];
      router.push('/');
    };

    // Update counts on component mount
    onMounted(() => {
      cartStore.loadCart();

      // Optionally listen for localStorage changes if you want
      window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
          cartStore.loadCart();
        }
      });
    });

    return {
      isMenuOpen,
      toggleMenu,
      cartCount,
      isLoggedIn: ref(false), // Replace with actual login logic
      handleLogout,
    };
  },
};
</script>

<style scoped>
/* No need for additional styles, using Tailwind CSS */
</style>
