import { computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * @param { string } field enum from @/enums/query.enum
 * @param { number|string } defaultValue
 * @return {string|LocationQueryValue[]|LocationQuery|UnwrapNestedRefs<{reset: reset, value: WritableComputedRef<string|LocationQueryValue[]|LocationQuery>}>|void|Promise<NavigationFailure | void | undefined>}
 */
export function useQuery(field, defaultValue) {
  const router = useRouter();
  const route = useRoute();

  const reset = function () {
    const query = { ...route.query };
    delete query[field];
    router.replace({ ...route, query });
  };

  const value = computed({
    get() {
      return (field ? route.query[field] : route.query) ?? defaultValue;
    },
    set(value) {
      if (!field) {
        return router.replace({
          ...route,
          query: { ...value },
        });
      }

      if (!value || !value.length) return reset();
      router.replace({
        ...route,
        query: { ...route.query, [field]: value },
      });
    },
  });

  return reactive({
    value: value,
    reset: reset,
  });
}
