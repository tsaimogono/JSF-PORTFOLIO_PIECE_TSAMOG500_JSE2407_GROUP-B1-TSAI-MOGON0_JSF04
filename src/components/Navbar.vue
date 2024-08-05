<template>
    <nav>
      <div class="navbar">
        <div class="navbar-brand">
          <router-link to="/" class="logo-link">
            SwiftCart
          </router-link>
        </div>
        <div class="navbar-menu">
          <router-link to="/">Products</router-link>
          <router-link to="/wishlist">Wishlist ({{ wishlist.length }})</router-link>
          <router-link to="/cart">Cart ({{ cart.length }})</router-link>
          <router-link to="/login">Login</router-link>
        </div>
        <div class="navbar-hamburger" @click="toggleMenu">
          <span class="hamburger-icon"></span>
          <span class="hamburger-icon"></span>
          <span class="hamburger-icon"></span>
        </div>
      </div>
      <div v-if="isMenuOpen" class="navbar-dropdown">
        <router-link to="/">Products</router-link>
        <router-link to="/wishlist">Wishlist ({{ wishlist.length }})</router-link>
        <router-link to="/cart">Cart ({{ cart.length }})</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { cart, wishlist, isLoggedIn } from '../stores'; // Correct path to the store
  
  export default {
    setup() {
      const isMenuOpen = ref(false);
  
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
      };
    },
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  