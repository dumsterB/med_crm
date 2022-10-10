import * as icons from '@/enums/icons.enum.js';
import { Invoice } from '@/models/Invoice.model';
import { ServiceGroup } from '@/models/ServiceGroup.model';
import { InvoicePaymentSubject } from '@/models/InvoicePaymentSubject.model';
import { Transaction } from '@/models/Transaction.model';
import { formatPrice } from '@/utils/price.util';
import { PrinterService } from '@/services/printer.service';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

import PatientsSearchSelectDataBlock from '@/components/patients/PatientsSearchSelectDataBlock/index.vue';
import PatientsSearchSelect from '@/components/patients/PatientsSearchSelect/index.vue';
import UiModelsAutocompleteSearch from '@/components/ui/UiModelsAutocompleteSearch/index.vue';
import InvoiceStatusTag from '@/components/invoices/InvoiceStatusTag/index.vue';
import InvoicePayOrRefundModal from '@/components/invoices/InvoicePayOrRefundModal/index.vue';
import TransactionsTable from '@/components/transactions/TransactionsTable/index.vue';

export default {
  name: 'CreateOrPayInvoiceModal',
  components: {
    InvoicePayOrRefundModal,
    InvoiceStatusTag,
    UiModelsAutocompleteSearch,
    PatientsSearchSelect,
    PatientsSearchSelectDataBlock,
    TransactionsTable,
  },
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    data: [Invoice, Object],
  },
  data() {
    return {
      /** @type {Invoice} invoice */
      invoice: null,
      /** @type {Array<Transaction>} transactions */
      transactions: [],
      loading: {
        form: false,
        transactions: false,
        print: false,
      },
      payModalIsOpen: false,
      payType: Transaction.enum.types.PayIn,
    };
  },
  computed: {
    servicesIds() {
      return this.invoice.payment_subjects.map((elem) => elem.subject.id);
    },
    totalPrice() {
      let sum = this.invoice.id
        ? this.invoice.discounted_amount
        : this.invoice.payment_subjects.reduce(
            (acc, elem) => acc + elem.subject.price * elem.count,
            0
          );
      sum =
        !this.invoice.id && this.invoice.discount > 0
          ? sum - sum * (this.invoice.discount / 100)
          : sum;

      return `${formatPrice({ price: sum })} ${this.$t('Base.Sum')}`;
    },

    isShowPayButton() {
      return (
        !!this.invoice.id &&
        [Invoice.enum.statuses.NotPaid, Invoice.enum.statuses.PartiallyPaid].includes(
          this.invoice.status
        )
      );
    },
    isShowRefundButton() {
      return (
        !!this.invoice.id &&
        [Invoice.enum.statuses.Paid, Invoice.enum.statuses.PartiallyPaid].includes(
          this.invoice.status
        )
      );
    },
  },

  watch: {
    'modelValue': {
      handler() {
        this.invoice = new Invoice(this.data || {});
      },
      immediate: true,
    },

    'invoice.id': {
      handler(value) {
        this.transactions = [];
        if (value) this.getTransactions();
      },
      immediate: true,
    },
  },

  methods: {
    async submitHandler() {
      if (this.loading.form) return;
      this.loading.form = true;

      try {
        await this.createInvoice();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.form = false;
    },

    async createInvoice() {
      const { data } = await Invoice.create(this.invoice);

      this.$notify({ type: 'success', title: this.$t('Notifications.SuccessCreated') });
      this.$emit(
        'action',
        new GlobalModalAction({ name: 'created', data: { invoice: data.data } })
      );
      this.$emit('update:modelValue', false);
    },

    /** @param {InvoicePaymentSubject} paymentSubject */
    deletePaymentSubject(paymentSubject) {
      this.invoice.payment_subjects = this.invoice.payment_subjects.filter(
        (elem) => elem.subject.id !== paymentSubject.subject.id
      );
    },

    /** @param {Array<ServiceGroup>} items */
    selectServiceGroup(items) {
      this.invoice.subjects = items.map((item) => ({
        group_service_id: item.id,
      }));

      this.invoice.payment_subjects = items.map(
        (item) =>
          new InvoicePaymentSubject({
            type: InvoicePaymentSubject.enum.types.GroupService,
            subject: item,
          })
      );
    },

    pay() {
      this.payType = Transaction.enum.types.PayIn;
      this.payModalIsOpen = true;
    },
    refund() {
      this.payType = Transaction.enum.types.PayOut;
      this.payModalIsOpen = true;
    },

    async invoicePayModalActionHandler(action) {
      this.$emit('action', action);
      this.payModalIsOpen = false;
    },

    async getTransactions() {
      this.loading.transactions = true;

      const { transactions } = await Transaction.getByInvoiceId(this.invoice.id);
      this.transactions = transactions;

      this.loading.transactions = false;
    },

    async print() {
      if (this.loading.print) return;
      this.loading.print = true;

      try {
        await PrinterService.printInvoiceById(this.invoice.id);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.print = false;
    },
  },

  setup: () => ({
    ServiceGroup,
    Invoice,
    icons,
  }),
};
