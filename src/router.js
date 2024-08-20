import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/ProductList.vue'; // Use relative path if in the same directory
import ProductDetail from './components/ProductDetail.vue'; // Use relative path if in the same directory
import Login from './components/Login.vue'; // Use relative path if in the same directory
import Wishlist from './components/wishlist.vue'; // Add import for Wishlist component
import Cart from './components/cart.vue'; // Add import for Cart component
import ComparisonList from './components/comparisonList.vue'; // Import the correct component
import { isLoggedIn } from './stores'; // Import isLoggedIn from your store

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
  },
  {
    path: '/comparison',
    name: 'ComparisonList',
    component: ComparisonList, // Use ComparisonList component
    beforeEnter: (to, from, next) => {
      if (isLoggedIn.value) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
