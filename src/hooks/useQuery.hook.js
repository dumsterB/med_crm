import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useQuery(field) {
  const router = useRouter();
  const route = useRoute();

  return computed({
    get() {
      return field ? route.query[field] : route.query;
    },
    set(value) {
      if (!field) {
        return router.replace({
          ...route,
          query: { ...value },
        });
      }

      if (!value || !value.length) {
        const query = { ...route.query };
        delete query[field];

        return router.replace({ ...route, query });
      }

      router.replace({
        ...route,
        query: { ...route.query, [field]: value },
      });
    },
  });
}
