import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/ProductList.vue'; // Use relative path if in the same directory
import ProductDetail from './components/ProductDetail.vue'; // Use relative path if in the same directory
import Login from './components/Login.vue'; // Use relative path if in the same directory
import Wishlist from './components/wishlist.vue'; // Add import for Wishlist component
import Cart from './components/cart.vue'; // Add import for Cart component
import ComparisonList from './components/comparisonList.vue'; // Import the correct component
import { isLoggedIn } from './stores'; // Import isLoggedIn from your store

/**
 * Defines and configures the Vue Router for the application.
 * 
 * @module router
 */

/**
 * Routes configuration for the application.
 * 
 * @constant {Array} routes - List of route objects for the Vue Router.
 * @property {string} path - The URL path for the route.
 * @property {string} name - The name of the route.
 * @property {Object} component - The Vue component associated with the route.
 * @property {Function} [beforeEnter] - Navigation guard to check if the user is logged in.
 */
const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn.value) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  },
  {
    path: '/comparison',
    name: 'ComparisonList',
    component: ComparisonList,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn.value) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  },
];

/**
 * Creates a new Vue Router instance with history mode.
 * 
 * @constant {Object} router - The Vue Router instance.
 * @property {Function} history - The history mode used by the router.
 * @property {Array} routes - The routes configuration for the router.
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
