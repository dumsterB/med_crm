<template>
  <ElDialog
    :model-value="modelValue"
    :title="$t('Base.Payment')"
    custom-class="invoice-pay-modal"
    @update:model-value="$emit('update:modelValue')">
    <ElForm
      id="invoice-pay"
      class="invoice-pay-modal-content"
      label-position="top"
      @submit.prevent="pay">
      <ElFormItem>
        <div class="invoice-pay-modal__sum invoice-pay-modal-sum">
          <span>{{ $t('Base.Cost') }}: </span>
          <span class="invoice-pay-modal-sum__value">{{ cost + ' ' + $t('Base.Sum') }}</span>
        </div>
      </ElFormItem>

      <ElFormItem :label="$t('PatientPaySum')">
        <ElInput v-model="transaction.amount" />
      </ElFormItem>

      <ElFormItem :label="$t('Invoices.PaymentMethod')"> </ElFormItem>
    </ElForm>

    <template #footer>
      <ElButton type="primary" native-type="submit" form="invoice-pay" :loading="loading">
        {{ $t('Base.Pay') }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<script>
import { Invoice } from '@/models/Invoice.model';
import { formatPrice } from '@/utils/price.util';
import { Transaction } from '@/models/Transaction.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { INVOICE_PAYED_ACTION } from '@/components/invoices/InvoicePayModal/index.enum';

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
      loading: null,
    };
  },
  watch: {
    'invoice.id': {
      handler(value) {
        this.transaction = new Transaction({
          amount: this.invoice.left_pay,
          type: Transaction.enum.types.PayIn,
          invoice_id: value,
        });
      },
      immediate: true,
    },
  },

  computed: {
    cost() {
      return formatPrice({ price: this.invoice.discounted_amount });
    },
  },

  methods: {
    async pay() {
      if (this.loading) return;
      this.loading = true;

      try {
        const payload = await Transaction.create(this.transaction);
        const { data } = await Invoice.findOneById(this.transaction.invoice_id);

        this.$emit(
          'action',
          new GlobalModalAction({
            name: INVOICE_PAYED_ACTION,
            data: {
              invoice: data.data,
              transaction: payload.data.data,
            },
          })
        );
        this.$emit('update:modelValue', false);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="./index.locales.json" />
