import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/ProductList.vue'; // Use relative path if in the same directory
import ProductDetail from './components/ProductDetail.vue'; // Use relative path if in the same directory
import Login from './components/Login.vue'; // Use relative path if in the same directory

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
