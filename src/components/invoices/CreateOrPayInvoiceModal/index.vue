<template>
  <ElDialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <template #header> Create </template>
  </ElDialog>
</template>

<script>
import { Invoice } from '@/models/Invoice.model';

export default {
  name: 'CreateOrPayInvoiceModal',
  props: {
    modelValue: Boolean,
    data: [Invoice, Object],
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="./index.locales.json" />
