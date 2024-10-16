import { createRouter, createWebHistory } from 'vue-router';
import ProductView from '@/pages/products/[id].vue';

const routes = [
  {
    path: '/products/:id',
    name: 'product-view',
    component: ProductView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
