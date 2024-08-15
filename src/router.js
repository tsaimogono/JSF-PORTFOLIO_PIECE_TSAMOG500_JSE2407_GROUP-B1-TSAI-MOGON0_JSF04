import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/ProductList.vue'; // Use relative path if in the same directory
import ProductDetail from './components/ProductDetail.vue'; // Use relative path if in the same directory
import Login from './components/Login.vue'; // Use relative path if in the same directory
import Wishlist from './components/wishlist.vue'; // Add import for Wishlist component
 import Cart from './components/cart.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;