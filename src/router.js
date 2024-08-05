import { createRouter, createWebHistory } from 'vue-router'; // Corrected import path
import Products from './components/ProductList.vue'; // Ensure this path is correct
import ProductDetail from './components/ProductDetail.vue'; // Ensure this path is correct

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
