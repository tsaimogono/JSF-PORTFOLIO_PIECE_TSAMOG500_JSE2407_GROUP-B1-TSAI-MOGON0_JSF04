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
        <router-link to="/comparison">Comparison</router-link>
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
      <router-link to="/comparison">Comparison</router-link>
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
import { useWishlistStore } from '../WishlistStore';

/**
 * @module Navbar
 * @description This component provides a navigation bar with links to products, wishlist, comparison, and cart.
 * It also handles user login/logout and displays the count of items in the cart and wishlist.
 */
export default {
  setup() {
    const isMenuOpen = ref(false);
    const cartStore = useCartStore();
    const router = useRouter();
    const wishlistStore = useWishlistStore();

    /**
     * @name cartCount
     * @type {ComputedRef<number>}
     * @description The computed property for the count of items in the cart.
     */
    const cartCount = computed(() => cartStore.cartCount);

    /**
     * @name toggleMenu
     * @function
     * @description Toggles the visibility of the mobile menu.
     */
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    /**
     * @name handleLogout
     * @function
     * @description Handles user logout by clearing local storage and resetting cart state.
     * Redirects the user to the home page after logout.
     */
    const handleLogout = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
      cartStore.items = [];
      router.push('/');
    };

    /**
     * @name onMounted
     * @function
     * @description Lifecycle hook to load cart and set up event listener for localStorage changes.
     */
    onMounted(() => {
      cartStore.loadCart();

      // Optionally listen for localStorage changes if needed
      window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
          cartStore.loadCart();
        }
      });
    });

    /**
     * @name isLoggedIn
     * @type {Ref<boolean>}
     * @description A ref indicating whether the user is logged in or not.
     * Replace with actual login logic.
     */
    const isLoggedIn = ref(false); // Replace with actual login logic

    /**
     * @name wishlistCount
     * @type {ComputedRef<number>}
     * @description The computed property for the count of items in the wishlist.
     */
    const wishlistCount = computed(() => wishlistStore.wishlistCount);

    return {
      isMenuOpen,
      toggleMenu,
      cartCount,
      isLoggedIn,
      handleLogout,
      wishlistCount,
    };
  },
};
</script>

<style scoped>
/* No need for additional styles, using Tailwind CSS */
</style>
