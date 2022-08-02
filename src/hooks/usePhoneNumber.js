import { computed } from 'vue';

/**
 * @param {reactivity<string>>} phone
 * @return {ComputedRef<{set(*): void, get(): string|null}>}
 */
export function usePhoneNumber(phone) {
  return computed(() => ({
    get() {
      return phone?.replace(/^\+*/, '');
    },
    set(value) {
      phone = value.replace(/^\+*/, '+');
    },
  }));
}
