import { ref, onMounted } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: T = await response.json();
      data.value = result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return { data, loading, error, refetch: fetchData };
}
