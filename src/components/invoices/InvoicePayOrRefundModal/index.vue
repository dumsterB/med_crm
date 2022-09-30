<template>
  <ElDialog
    :model-value="modelValue"
    :title="title"
    custom-class="invoice-pay-or-refund-modal"
    @update:model-value="$emit('update:modelValue')">
    <ElForm
      id="invoice-pay-or-refund"
      class="invoice-pay-or-refund-modal-content"
      label-position="top"
      @submit.prevent="submitHandler">
      <ElFormItem>
        <div class="invoice-pay-or-refund-modal__sum invoice-pay-or-refund-modal-sum">
          <span>{{ $t('Base.SumCost') }}: </span>
          <span class="invoice-pay-or-refund-modal-sum__value">
            {{ cost + ' ' + $t('Base.Sum') }}
          </span>
        </div>
      </ElFormItem>

      <ElFormItem
        :label="
          type === Transaction.enum.types.PayIn ? $t('PatientPaySum') : $t('PatientRefundSum')
        ">
        <ElInput v-model="transaction.amount" />
      </ElFormItem>

      <ElFormItem :label="$t('Invoices.PaymentMethod')"> </ElFormItem>
    </ElForm>

    <template #footer>
      <ElButton type="primary" native-type="submit" form="invoice-pay-or-refund" :loading="loading">
        {{ type === Transaction.enum.types.PayIn ? $t('Base.Pay') : $t('Base.Refund') }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<script>
import { Invoice } from '@/models/Invoice.model';
import { formatPrice } from '@/utils/price.util';
import { Transaction } from '@/models/Transaction.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import {
  INVOICE_PAYED_ACTION,
  INVOICE_REFUND_ACTION,
} from '@/components/invoices/InvoicePayOrRefundModal/index.enum';

export default {
  name: 'InvoicePayOrRefundModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    invoice: [Invoice, Object],
    type: {
      type: String,
      default: Transaction.enum.types.PayIn,
      validator: (val) =>
        [Transaction.enum.types.PayIn, Transaction.enum.types.PayOut].includes(val),
    },
  },
  data() {
    return {
      /** @type {Transaction} transaction */
      transaction: null,
      loading: null,
    };
  },
  computed: {
    title() {
      return this.$t(this.type === Transaction.enum.types.PayIn ? 'Base.Payment' : 'Base.Refund');
    },
    cost() {
      return formatPrice({
        price:
          this.type === Transaction.enum.types.PayIn
            ? this.invoice.left_pay
            : this.invoice.discounted_amount - this.invoice.left_pay,
      });
    },
  },

  watch: {
    modelValue: {
      handler() {
        this.transaction = new Transaction({
          amount:
            this.type === Transaction.enum.types.PayIn
              ? this.invoice.left_pay
              : this.invoice.discounted_amount - this.invoice.left_pay,
          type: this.type,
          invoice_id: this.invoice.id,
        });
      },
      immediate: true,
    },
  },

  methods: {
    async submitHandler() {
      if (this.loading) return;
      this.loading = true;

      try {
        const transaction = await this.createTransaction();
        const { data } = await Invoice.findOneById(this.transaction.invoice_id);

        this.$notify({
          type: 'success',
          title: this.$t(
            this.type === Transaction.enum.types.PayIn
              ? 'Invoices.SuccessPayed'
              : 'Invoices.SuccessRefunded'
          ),
        });

        this.$emit(
          'action',
          new GlobalModalAction({
            name:
              this.type === Transaction.enum.types.PayIn
                ? INVOICE_PAYED_ACTION
                : INVOICE_REFUND_ACTION,
            data: {
              invoice: data.data,
              transaction: transaction,
            },
          })
        );
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading = false;
    },

    async createTransaction() {
      const { data } = await Transaction.create(this.transaction);
      return data.data;
    },
  },

  setup: () => ({
    Transaction,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="./index.locales.json" />
