import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 *
 * @param { string } field enum from @/enums/query.enum
 * @return {{reset: void, value: WritableComputedRef<string|LocationQueryValue[]|LocationQuery>}
 */
export function useQuery(field) {
  const router = useRouter();
  const route = useRoute();

  const reset = function (field) {
    const query = { ...route.query };
    delete query[field];
    router.replace({ ...route, query });
  };

  return {
    value: computed({
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

        if (!value || !value.length) return reset(field);
        router.replace({
          ...route,
          query: { ...route.query, [field]: value },
        });
      },
    }),

    reset: reset,
  };
}
