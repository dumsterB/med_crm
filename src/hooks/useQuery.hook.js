import { computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * @param { string } field enum from @/enums/query.enum
 * @param { number|string|null } [defaultValue]
 * @param { void|null } [formatter]
 * @param { boolean } [valueIsNumber = false]
 * @return {string|LocationQueryValue[]|LocationQuery|UnwrapNestedRefs<{reset: reset, value: WritableComputedRef<string|LocationQueryValue[]|LocationQuery>}>|void|Promise<NavigationFailure | void | undefined>}
 */
export function useQuery({ field, defaultValue = null, formatter = null, valueIsNumber = false }) {
  const router = useRouter();
  const route = useRoute();

  const reset = function () {
    const query = { ...route.query };
    delete query[field];
    router.push({ ...route, query });
  };

  const value = computed({
    get() {
      const value = (field ? route.query[field] : route.query) ?? defaultValue;
      return valueIsNumber ? +value : value;
    },
    set(value) {
      if (!field) {
        router.push({
          ...route,
          query: { ...value },
        });
      }

      if (field) {
        value = formatter ? formatter(value) : value;
        value = value?.toString();
        if (!value && !value?.length) return reset();

        router.push({
          ...route,
          query: { ...route.query, [field]: value },
        });
      }
    },
  });

  return reactive({
    value: value,
    reset: reset,
  });
}
