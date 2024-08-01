<template>
    <nav>
      <div class="navbar bg-gray-900 p-4">
        <!-- Navbar Brand -->
        <div class="navbar-brand text-white text-xl font-bold">
          <router-link to="/" class="logo-link">
            SwiftCart
          </router-link>
        </div>
        
        <!-- Desktop Menu -->
        <div class="navbar-menu hidden md:flex space-x-4">
          <router-link to="/" class="text-white">Products</router-link>
          <router-link to="/wishlist" class="text-white">Wishlist ({{ wishlist.length }})</router-link>
          <router-link to="/cart" class="text-white">Cart ({{ cart.length }})</router-link>
          <router-link to="/login" class="text-white">Login</router-link>
        </div>
        
        <!-- Hamburger Menu for Mobile -->
        <div class="navbar-hamburger md:hidden" @click="toggleMenu">
          <span class="hamburger-icon block w-6 h-0.5 bg-white mb-1"></span>
          <span class="hamburger-icon block w-6 h-0.5 bg-white mb-1"></span>
          <span class="hamburger-icon block w-6 h-0.5 bg-white"></span>
        </div>
      </div>
      
      <!-- Mobile Menu Dropdown -->
      <div v-if="isMenuOpen" class="navbar-dropdown md:hidden bg-gray-800 p-4 space-y-2">
        <router-link to="/" class="block text-white">Products</router-link>
        <router-link to="/wishlist" class="block text-white">Wishlist ({{ wishlist.length }})</router-link>
        <router-link to="/cart" class="block text-white">Cart ({{ cart.length }})</router-link>
        <router-link to="/login" class="block text-white">Login</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { cart, wishlist, isLoggedIn } from '../store'; // Ensure these are correctly exported from your store
  
  export default {
    setup() {
      const isMenuOpen = ref(false);
      const router = useRouter();
  
      const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
      };
  
      const handleResize = () => {
        if (window.innerWidth > 768 && isMenuOpen.value) {
          isMenuOpen.value = false;
        }
      };
  
      onMounted(() => {
        window.addEventListener('resize', handleResize);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
      });
  
      return {
        isMenuOpen,
        toggleMenu,
        cart,
        wishlist,
        isLoggedIn,
        router,
      };
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-brand {
    /* Style for brand/logo */
  }
  
  .navbar-menu a {
    /* Style for menu items */
  }
  
  .navbar-hamburger {
    cursor: pointer;
  }
  
  .hamburger-icon {
    display: block;
    width: 1.5rem;
    height: 0.25rem;
    background-color: white;
    margin-bottom: 0.25rem;
  }
  
  .navbar-dropdown {
    background-color: #2d3748; /* Dark gray */
    padding: 1rem;
    space-y-2: spacing between links */
  }
  
  .navbar-dropdown a {
    color: white;
  }
  </style>
  