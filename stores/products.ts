import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export const useProductStore = defineStore('product', () => {
  const products: Ref<Product[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch<Product[]>('https://fakestoreapi.com/products');
      products.value = response;
      console.log('Fetched products:', response);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = String(err);
      }
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, error, fetchProducts };
});
