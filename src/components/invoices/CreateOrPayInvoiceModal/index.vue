<template>
  <ElDialog
    custom-class="create-or-pay-invoice-modal"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <template #header>
      <span v-if="!data?.id"> {{ $t('Invoices.Create') }}</span>
    </template>

    <ElForm
      id="create-or-pay-invoice"
      class="create-or-pay-invoice-modal__content create-or-pay-invoice-modal-content"
      @submit.prevent="submitHandler">
      <!--  Patient  -->
      <div class="create-or-pay-invoice-modal-part">
        <div class="create-or-pay-invoice-modal-part-header">
          <div class="create-or-pay-invoice-modal-part-header__title">{{ $t('PatientInfo') }}</div>
        </div>

        <PatientsSearchSelect
          class="create-or-pay-invoice-modal-part-search"
          v-model="invoice.user_id"
          required
          @select="invoice.user = $event" />

        <div class="create-or-pay-invoice-modal-part-content">
          <ElFormItem :label="$t('User.FullName')">
            {{ invoice.user?.name || '....' }}
          </ElFormItem>

          <ElFormItem :label="$t('User.Phone')">
            {{ invoice.user?.phone || '....' }}
          </ElFormItem>

          <ElFormItem class="create-or-pay-invoice-modal-notes-part" :label="$t('Base.Notes')">
            <ElInput type="textarea" :rows="3" v-model="invoice.notes" />
          </ElFormItem>
        </div>
      </div>

      <!--  Services  -->
      <div class="create-or-pay-invoice-modal-part">
        <div class="create-or-pay-invoice-modal-part-header">
          <div class="create-or-pay-invoice-modal-part-header__title">{{ $t('Services') }}</div>
        </div>

        <div class="create-or-pay-invoice-modal-part-search">
          <UiModelsAutocompleteSearch
            :model-value="servicesIds"
            :model-for-use="ServiceGroup"
            label="title"
            multiple
            required
            collapse-tags
            @select="selectServiceGroup" />
        </div>

        <div class="create-or-pay-invoice-modal-part-content">
          <UiDataList class="create-or-pay-invoice-modal__services-list" :data="[]" />
          <ElFormItem
            class="create-or-pay-invoice-modal__discount-part"
            :label="$t('Base.Discount') + ' (%)'">
            <ElInput v-model="invoice.discount" type="number" placeholder="0%" />
          </ElFormItem>
          <ElFormItem :label="$t('Base.Total')"> {{ totalPrice }} </ElFormItem>
        </div>
      </div>
    </ElForm>

    <template #footer>
      <div class="create-or-pay-invoice-modal-actions">
        <ElButton type="primary" native-type="submit" form="create-or-pay-invoice">
          {{ $t('Base.Create') }}
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script>
import { Invoice } from '@/models/Invoice.model';
import { ServiceGroup } from '@/models/ServiceGroup.model';
import { InvoicePaymentSubject } from '@/models/InvoicePaymentSubject.model';
import { formatPrice } from '@/utils/price.util';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

import PatientsSearchSelect from '@/components/patients/PatientsSearchSelect/index.vue';
import UiModelsAutocompleteSearch from '@/components/ui/UiModelsAutocompleteSearch/index.vue';

export default {
  name: 'CreateOrPayInvoiceModal',
  components: { UiModelsAutocompleteSearch, PatientsSearchSelect },
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    data: [Invoice, Object],
  },
  data() {
    return {
      /** @type {Invoice} invoice */
      invoice: null,
      loading: false,
    };
  },
  computed: {
    servicesIds() {
      return this.invoice.payment_subjects.map((elem) => elem.subject.id);
    },
    totalPrice() {
      let sum = this.invoice.payment_subjects.reduce(
        (acc, elem) => acc + elem.subject.services[0]?.price * elem.count,
        0
      );
      sum = this.invoice.discount > 0 ? sum - sum * (this.invoice.discount / 100) : sum;

      return `${formatPrice({ price: sum })} ${this.$t('Base.Sum')}`;
    },
  },

  watch: {
    modelValue: {
      handler() {
        this.invoice = new Invoice(this.data || {});
      },
      immediate: true,
    },
  },

  methods: {
    async submitHandler() {
      if (this.loading) return;
      this.loading = true;

      try {
        await this.createInvoice();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading = false;
    },

    async createInvoice() {
      const { data } = await Invoice.create(this.invoice);

      this.$notify({ type: 'success', title: this.$t('Notifications.SuccessCreated') });
      this.$emit(
        'action',
        new GlobalModalAction({ name: 'created', data: { invoice: data.data } })
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
  },

  setup: () => ({
    ServiceGroup,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
