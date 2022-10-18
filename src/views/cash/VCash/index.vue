<template>
  <LayoutRegistry content-class="v-cash-content">
    <LayoutContentHeader class="v-cash-content__header v-cash-content-header">
      <ElDatePicker
        class="v-cash-content-header__date"
        v-model="date"
        type="daterange"
        unlink-panels
        format="DD.MM.YY"
        value-format="DD.MM.YY"
        :start-placeholder="$t('DateAndTime.StartDate')"
        :end-placeholder="$t('DateAndTime.EndDate')" />

      <SelectInvoiceStatus class="v-cash-content-header__status" clearable v-model="status.value" />
      <UiModelsAutocompleteSearch
        class="v-cash-content-header__doctor"
        :model-value="doctorId.value"
        :model-for-use="Doctor"
        :default-item="doctorFromRoute"
        :placeholder="$t('Appointments.SelectDoctor')"
        clearable
        @select="selectDoctor" />

      <template #actions>
        <a :href="exportDataURL" download>
          <ElButton plain text>
            <template #icon> <UiIcon :icon="icons.DOWNLOAD" /> </template>
            {{ $t('Base.Download') }}
          </ElButton>
        </a>

        <ElButton type="primary" @click="createInvoice">
          <template #icon> <UiIcon :icon="icons.PLUS" /> </template>
          {{ $t('Invoices.Create') }}
        </ElButton>
      </template>
    </LayoutContentHeader>

    <div class="v-cash-content__statistic">
      <UiSimpleStatisticCard
        v-for="item in statisticCards"
        :key="item.key"
        :label="item.label"
        :value="item.value" />
    </div>

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
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { mergeOrCreateQuery } from '@/utils/http.util';
import { deleteEmptyValueKeys } from '@/utils/object.util';
import { formatPrice } from '@/utils/price.util';
import { useQuery } from '@/hooks/useQuery.hook';
import { usePage, usePerPage } from '@/hooks/query';
import { Invoice } from '@/models/Invoice.model';
import { Doctor } from '@/models/Doctor.model';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';
import { ApiService } from '@/services/api.service';

import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import SelectInvoiceStatus from '@/components/invoices/SelectInvoiceStatus/index.vue';
import InvoicesTable from '@/components/invoices/InvoicesTable/index.vue';
import CreateOrPayInvoiceModal from '@/components/invoices/CreateOrPayInvoiceModal/index.vue';

export default {
  name: 'VCash',
  components: { InvoicesTable, SelectInvoiceStatus, LayoutContentHeader, LayoutRegistry },
  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    status: useQuery({ field: 'status' }),
    doctorId: useQuery({ field: 'doctor_id' }),
    doctorName: useQuery({ field: 'doctor_name' }),
    startAt: useQuery({ field: 'start_at' }),
    endAt: useQuery({ field: 'end_at' }),

    icons: icons,
    Invoice,
    Doctor,
  }),
  data() {
    return {
      statistic: {
        loading: false,
        /** @type {InvoiceStatistic} data */
        data: {},
      },
    };
  },
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
        doctor_id: this.doctorId.value,
      };
    },

    statisticCards() {
      return Invoice.enum.StatisticKeys.map((key) => ({
        key: key,
        label: this.$t(`Invoices.Statistic.${key}`),
        value: ['amount', 'refund_amount'].includes(key)
          ? formatPrice({ price: this.statistic.data[key] })
          : this.statistic.data[key],
      }));
    },

    date: {
      get() {
        return [this.startAt.value, this.endAt.value];
      },
      set(value) {
        this.startAt.value = value ? value[0] : null;
        setTimeout(() => (this.endAt.value = value ? value[1] : null));
      },
    },
    doctorFromRoute() {
      return this.doctorId.value ? { id: this.doctorId.value, name: this.doctorName.value } : null;
    },

    exportDataURL() {
      return mergeOrCreateQuery({
        url: Invoice.exportDataURL,
        query: deleteEmptyValueKeys({
          ...this.queryWatchers,
          token: ApiService.getToken(),
        }), // per_page, page будут игнорироваться на бэке
      });
    },
  },

  watch: {
    queryWatchers: {
      handler(value, oldValue) {
        compareQueriesThenLoadData({
          query: value,
          oldQuery: oldValue,
          resetPage: this.page.reset,
          getData: this.getInvoicesAndStatistic,
          fieldsForResetPage: ['status', 'start_at', 'end_at', 'doctor_id'],
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

    async getInvoicesAndStatistic() {
      this.getInvoices();
      this.getStatistic();
    },

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

    async getStatistic() {
      this.statistic.loading = true;

      const { statistic } = await Invoice.getStatistic(this.queryWatchers);
      this.statistic.data = statistic;

      this.statistic.loading = true;
    },

    async createInvoice() {
      const action = await this.$store.dispatch(
        'modalAndDrawer/openModal',
        CreateOrPayInvoiceModal
      );

      if (action instanceof GlobalModalCloseAction) return;
      this.createItem(action.data.invoice);
    },

    selectDoctor(doctor) {
      this.doctorId.value = doctor?.id;
      setTimeout(() => (this.doctorName.value = doctor?.name));
    },

    exportData() {
      Invoice.export();
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
