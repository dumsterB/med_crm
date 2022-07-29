import { computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * @param { string } field enum from @/enums/query.enum
 * @param { number|string } [defaultValue]
 * @param { boolean } [valueIsNumber = false]
 * @return {string|LocationQueryValue[]|LocationQuery|UnwrapNestedRefs<{reset: reset, value: WritableComputedRef<string|LocationQueryValue[]|LocationQuery>}>|void|Promise<NavigationFailure | void | undefined>}
 */
export function useQuery({ field, defaultValue, valueIsNumber = false }) {
  const router = useRouter();
  const route = useRoute();

  const reset = function () {
    const query = { ...route.query };
    delete query[field];
    router.replace({ ...route, query });
  };

  const value = computed({
    get() {
      const value = (field ? route.query[field] : route.query) ?? defaultValue;
      return valueIsNumber ? +value : value;
    },
    set(value) {
      if (!field) {
        return router.replace({
          ...route,
          query: { ...value },
        });
      }

      console.log(value, !value);
      if (!value && !value.length) return reset();

      console.log({ route, query: { ...route.query, [field]: value } });
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
