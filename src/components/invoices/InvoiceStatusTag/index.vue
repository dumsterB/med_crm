<template>
  <ElTag effect="dark" :type="type" round> {{ $t(`Invoices.Statuses.${status}`) }} </ElTag>
</template>

<script>
import { Invoice } from '@/models/Invoice.model';

export default {
  name: 'InvoiceStatusTag',
  props: {
    status: String,
  },

  computed: {
    type() {
      switch (this.status) {
        case Invoice.enum.statuses.Paid:
          return 'success';
        case Invoice.enum.statuses.PartiallyPaid:
          return 'warning';
        case Invoice.enum.statuses.NotPaid:
          return 'danger';
        case Invoice.enum.statuses.Refund:
          return '';
        case Invoice.enum.statuses.Canceled:
          return 'info';
        default:
          return '';
      }
    },
  },
};
</script>

<i18n src="@/locales/invoices.locales.json" />
