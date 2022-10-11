<template>
  <LayoutRegistry content-class="v-cash-content">
    <LayoutContentHeader class="v-cash-content__header v-cash-content-header">
      <ElDatePicker
        v-model="date"
        type="daterange"
        unlink-panels
        :start-placeholder="$t('DateAndTime.StartDate')"
        :end-placeholder="$t('DateAndTime.EndDate')" />

      <SelectInvoiceStatus clearable v-model="status.value" />

      <template #actions>
        <ElButton type="primary" @click="createInvoice">
          <template #icon> <UiIcon :icon="icons.PLUS" /> </template>
          {{ $t('Invoices.Create') }}
        </ElButton>
      </template>
    </LayoutContentHeader>

    <InvoicesTable
      class="v-cash-content__table"
      :items="items"
      :loading="loading"
      v-model:page="page.value"
      v-model:per-page="perPage.value"
      :total="total"
      @item:edit="editItem" />
  </LayoutRegistry>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import { debounce } from 'lodash';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { useQuery } from '@/hooks/useQuery.hook';
import { usePage, usePerPage } from '@/hooks/query';
import { Invoice } from '@/models/Invoice.model';

import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import SelectInvoiceStatus from '@/components/invoices/SelectInvoiceStatus/index.vue';
import InvoicesTable from '@/components/invoices/InvoicesTable/index.vue';
import CreateOrPayInvoiceModal from '@/components/invoices/CreateOrPayInvoiceModal/index.vue';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

export default {
  name: 'VCash',
  components: { InvoicesTable, SelectInvoiceStatus, LayoutContentHeader, LayoutRegistry },
  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    status: useQuery({ field: 'status' }),
    startAt: useQuery({ field: 'start_at' }),
    endAt: useQuery({ field: 'end_at' }),

    icons: icons,
    Invoice,
  }),
  computed: {
    ...mapState({
      loading: (state) => state.invoices.loading,
      items: (state) => state.invoices.data,
      total: (state) => state.invoices.total,
    }),

    queryWatchers() {
      return {
        per_page: this.perPage.value,
        page: this.page.value,
        status: this.status.value,
        start_at: this.startAt.value,
        end_at: this.endAt.value,
      };
    },

    date: {
      get() {
        return [this.startAt.value, this.endAt.value];
      },
      set(value) {
        this.startAt.value = value ? value[0].toISOString() : null;
        setTimeout(() => (this.endAt.value = value ? value[1].toISOString() : value));
      },
    },
  },

  watch: {
    queryWatchers: {
      handler(value, oldValue) {
        compareQueriesThenLoadData({
          query: value,
          oldQuery: oldValue,
          resetPage: this.page.reset,
          getData: this.getInvoices,
          fieldsForResetPage: ['status', 'start_at', 'end_at'],
        });
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      setLoading: 'invoices/setLoading',
      setData: 'invoices/setData',
      createItem: 'invoices/createItem',
      editItem: 'invoices/editItem',
    }),

    async getInvoices() {
      if (this.queryWatchers.start_at && !this.queryWatchers.end_at) return;
      this.setLoading(true);

      try {
        const { data } = await Invoice.find(this.queryWatchers);
        this.setData({
          items: data.data,
          total: +data.meta.total,
          overwriteDataState: true,
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.setLoading(false);
    },

    async createInvoice() {
      const action = await this.$store.dispatch(
        'modalAndDrawer/openModal',
        CreateOrPayInvoiceModal
      );

      if (action instanceof GlobalModalCloseAction) return;
      this.createItem(action.data.invoice);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="./index.locales.json" />
