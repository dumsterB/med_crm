<template>
  <ElDialog
    custom-class="create-or-pay-invoice-modal"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <template #header>
      <div v-if="data?.id" class="create-or-pay-invoice-modal-header">
        <div>{{ $t('Base.Invoice') }}:</div>
        <div>#{{ data?.id }}</div>
        <InvoiceStatusTag
          class="create-or-pay-invoice-modal-header__status"
          :status="data.status" />
      </div>

      <div v-else class="create-or-pay-invoice-modal__header">
        {{ $t('Invoices.Create') }}
      </div>
    </template>

    <ElForm
      id="create-or-pay-invoice"
      class="create-or-pay-invoice-modal__content create-or-pay-invoice-modal-content"
      @submit.prevent="submitHandler">
      <!--  TODO: вынести в отдельный компоент, будет использоваться и при создании записи  -->
      <!--  Patient  -->
      <div class="create-or-pay-invoice-modal-part">
        <div class="create-or-pay-invoice-modal-part-header">
          <div class="create-or-pay-invoice-modal-part-header__title">{{ $t('PatientInfo') }}</div>
        </div>

        <PatientsSearchSelect
          class="create-or-pay-invoice-modal-part-search"
          v-model="invoice.user_id"
          required
          :default-item="invoice.user"
          :disabled="!!invoice.id"
          @select="invoice.user = $event" />

        <div class="create-or-pay-invoice-modal-part-content">
          <ElFormItem :label="$t('User.FullName')">
            {{ invoice.user?.name || '....' }}
          </ElFormItem>

          <ElFormItem :label="$t('User.Phone')">
            {{ invoice.user?.phone || '....' }}
          </ElFormItem>

          <ElFormItem class="create-or-pay-invoice-modal-notes-part" :label="$t('Base.Notes')">
            <ElInput
              v-model="invoice.description"
              type="textarea"
              :rows="3"
              :disabled="!!invoice.id" />
          </ElFormItem>

          <ElFormItem v-if="!!invoice.id" :label="$t('DateAndTime.CreatedAt')">
            {{ invoice.created_at }}
          </ElFormItem>
        </div>
      </div>

      <!--  TODO: вынести в отдельный компоент, будет использоваться и при создании записи  -->
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
            :disabled="!!invoice.id"
            @select="selectServiceGroup" />
        </div>

        <div class="create-or-pay-invoice-modal-part-content">
          <ElTable class="create-or-pay-invoice-modal__services" :data="invoice.payment_subjects">
            <ElTableColumn prop="subject.title" />

            <ElTableColumn prop="subject.price">
              <template #default="{ row }">
                {{ row.subject.price ?? row.subject.total_amount }}
              </template>
            </ElTableColumn>

            <ElTableColumn v-if="!data?.id" prop="actions" width="50px">
              <template #default="{ row }">
                <ElButton text size="small" @click="deletePaymentSubject(row)">
                  <template #icon><UiIcon :icon="icons.CANCEL" /> </template>
                </ElButton>
              </template>
            </ElTableColumn>
          </ElTable>

          <ElFormItem
            class="create-or-pay-invoice-modal__discount-part"
            :label="$t('Base.Discount') + ' (%)'">
            <ElInput
              v-model="invoice.discount"
              type="number"
              placeholder="0%"
              :disabled="!!invoice.id" />
          </ElFormItem>
          <ElFormItem :label="$t('Base.Total')"> {{ totalPrice }} </ElFormItem>
        </div>
      </div>
    </ElForm>

    <template #footer>
      <div class="create-or-pay-invoice-modal-actions">
        <ElButton
          v-if="!data?.id"
          type="primary"
          native-type="submit"
          :loading="loading"
          form="create-or-pay-invoice">
          {{ $t('Base.Create') }}
        </ElButton>

        <ElButton v-if="!!data?.id" type="primary" @click="payModalIsOpen = true">
          {{ $t('Base.Pay') }}
        </ElButton>
      </div>
    </template>
  </ElDialog>

  <InvoicePayModal :invoice="invoice" v-model="payModalIsOpen" />
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Invoice } from '@/models/Invoice.model';
import { ServiceGroup } from '@/models/ServiceGroup.model';
import { InvoicePaymentSubject } from '@/models/InvoicePaymentSubject.model';
import { formatPrice } from '@/utils/price.util';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

import PatientsSearchSelect from '@/components/patients/PatientsSearchSelect/index.vue';
import UiModelsAutocompleteSearch from '@/components/ui/UiModelsAutocompleteSearch/index.vue';
import InvoiceStatusTag from '@/components/invoices/InvoiceStatusTag/index.vue';
import InvoicePayModal from '@/components/invoices/InvoicePayModal/index.vue';

export default {
  name: 'CreateOrPayInvoiceModal',
  components: {
    InvoicePayModal,
    InvoiceStatusTag,
    UiModelsAutocompleteSearch,
    PatientsSearchSelect,
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
      loading: false,
      payModalIsOpen: false,
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
            (acc, elem) => acc + (elem.subject.price ?? elem.subject.total_amount) * elem.count,
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

    async pay() {},

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
  },

  setup: () => ({
    ServiceGroup,
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="./index.locales.json" />
