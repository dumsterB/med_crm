<template>
  <div class="invoices-table-wrapper">
    <ElScrollbar class="invoices-table-wrapper__scrollbar">
      <ElTable
        v-loading="loading"
        class="invoices-table"
        :data="itemsWithPayload"
        :empty-text="$t('Base.NoData')"
        ref="elTable"
        @row-click="openInvoice">
        <ElTableColumn prop="id" :label="$t('Invoices.Number')">
          <template #default="{ row }"> #{{ row.id }} </template>
        </ElTableColumn>

        <ElTableColumn prop="user" :label="$t('Base.Patient')" width="230px">
          <template #default="{ row }">
            <UiUserAvatarInfo :user="row.user" :bold="false" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="appointment.doctor.name" :label="$t('Base.Doctor')" width="230px" />

        <ElTableColumn prop="_services_count" :label="$t('Base.Services')" width="100px" />
        <ElTableColumn prop="_cost" :label="`${$t('Base.Cost')} (${$t('Base.Sum')})`" />

        <ElTableColumn prop="status" :label="$t('Base.Status')">
          <template #default="{ row }">
            <InvoiceStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="_created_date" :label="$t('DateAndTime.CreatedAt')" />

        <ElTableColumn prop="actions" :label="$t('Base.Actions')" width="180px">
          <ElButton type="primary" text>
            <template #icon> <UiIcon :icon="icons.EYE" /> </template>
            {{ $t('Base.View') }}
          </ElButton>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>

    <ElPagination
      class="invoices-table-wrapper__pagination"
      :current-page="page"
      :page-count="pageCount"
      :page-size="perPage"
      :page-sizes="PAGE_SIZES"
      :total="total"
      background
      hide-on-single-page
      layout="prev, pager, next, sizes"
      @update:current-page="$emit('update:page', $event)"
      @update:page-size="$emit('update:perPage', $event)" />
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import { formatPrice } from '@/utils/price.util';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import InvoiceStatusTag from '@/components/invoices/InvoiceStatusTag/index.vue';
import CreateOrPayInvoiceModal from '@/components/invoices/CreateOrPayInvoiceModal/index.vue';

export default {
  name: 'InvoicesTable',
  components: { InvoiceStatusTag },
  emits: ['update:perPage', 'update:page', 'item:edit'],
  props: {
    /** @property {Array<Invoice|object>} items */
    items: Array,
    loading: Boolean,
    page: Number,
    perPage: Number,
    total: Number,
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },

    itemsWithPayload() {
      return this.items.map((elem) => ({
        ...elem,
        _services_count: elem.payment_subjects.length,
        _cost: formatPrice({ price: elem.discounted_amount ?? elem.total_amount }),
        _created_date: elem.created_at.split(' ')[0],
      }));
    },
  },
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

  methods: {
    async openInvoice(row) {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateOrPayInvoiceModal,
        payload: {
          data: row,
        },
      });

      if (action instanceof GlobalModalCloseAction) return;
      this.$emit('item:edit', action.data.invoice);
    },
  },
  setup: () => ({
    PAGE_SIZES: PAGE_SIZES,
    icons: icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="./index.locales.json" />
