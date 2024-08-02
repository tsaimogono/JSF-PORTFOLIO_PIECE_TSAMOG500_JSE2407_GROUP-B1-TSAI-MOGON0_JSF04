import { createRouter, createWebHistory } from 'vue-router';
import Products from './Routes/+Products.vue';
import ProductDetail from './Routes/+ProductDetail.vue';

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
