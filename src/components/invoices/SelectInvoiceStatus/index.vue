<template>
  <ElSelect
    :model-value="modelValue"
    :multiple="multiple"
    collapse-tags
    :placeholder="$t('Placeholder')"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElOption
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value" />
  </ElSelect>
</template>

<script>
import { Invoice } from '@/models/Invoice.model';

export default {
  name: 'SelectInvoiceStatus',
  emits: ['update:modelValue'],
  props: {
    modelValue: [String, Array],
    multiple: Boolean,
  },

  computed: {
    options() {
      return Object.keys(Invoice.enum.statuses).map((key) => ({
        label: this.$t(`Invoices.Statuses.${Invoice.enum.statuses[key]}`),
        value: Invoice.enum.statuses[key],
      }));
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="./index.locales.json" />
