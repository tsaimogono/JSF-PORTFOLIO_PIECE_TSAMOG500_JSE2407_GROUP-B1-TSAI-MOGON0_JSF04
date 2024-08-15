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
        <router-link to="/wishlist">Wishlist ({{ wishlist.length }})</router-link>
        <router-link to="/cart">Cart ({{ cart.length }})</router-link>
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
      <router-link to="/wishlist">Wishlist ({{ wishlist.length }})</router-link>
      <router-link to="/cart">Cart ({{ cart.length }})</router-link>
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { cart, wishlist, isLoggedIn } from '../stores'; 

export default {
  setup() {
    const isMenuOpen = ref(false);
    const router = useRouter();

    // Watch the `isLoggedIn` state to handle any necessary actions
    watch(isLoggedIn, (newValue) => {
      if (!newValue) {
        // Optionally redirect or handle additional cleanup when logged out
        router.push('/login');
      }
    });

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen.value) {
        isMenuOpen.value = false;
      }
    };

    const handleLogout = () => {
      // Clear authentication data
      localStorage.removeItem('jwt');
      isLoggedIn.value = false;
      // Redirect to the login page
      router.push('/');
    };

    window.addEventListener('resize', handleResize);

    return {
      isMenuOpen,
      toggleMenu,
      cart,
      wishlist,
      isLoggedIn,
      handleLogout,
    };
  },
};
</script>

<style scoped>
/* No need for additional styles, using Tailwind CSS */
</style>
