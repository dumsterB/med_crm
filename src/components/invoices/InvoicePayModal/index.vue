<template>
  <ElDialog
    :model-value="modelValue"
    :title="$t('Base.Payment')"
    @update:model-value="$emit('update:modelValue')">
    <ElForm label-position="top" class="invoice-pay-modal-content">
      <ElFormItem :label="$t('Base.Cost') + ':'"> {{ cost + ' ' + $t('Base.Sum') }} </ElFormItem>
      <ElFormItem :label="$t('PatientPaySum')">
        <ElInput v-model="transaction.amount" />
      </ElFormItem>
    </ElForm>

    <template #footer>
      <ElButton type="primary">{{ $t('Base.Pay') }}</ElButton>
    </template>
  </ElDialog>
</template>

<script>
import { Invoice } from '@/models/Invoice.model';
import { formatPrice } from '@/utils/price.util';
import { Transaction } from '@/models/Transaction.model';

export default {
  name: 'InvoicePayModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    invoice: [Invoice, Object],
  },
  data() {
    return {
      /** @type {Transaction} transaction */
      transaction: null,
    };
  },
  watch: {
    'invoice.id': {
      handler(value) {
        this.transaction = new Transaction({
          type: Transaction.enum.types.PayIn,
          invoice_id: value,
        });
      },
      immediate: true,
    },

    'invoice.discounted_amount': {
      handler(value) {
        this.transaction.amount = value;
      },
      immediate: true,
    },
  },

  computed: {
    cost() {
      return formatPrice({ price: this.invoice.discounted_amount });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
