<template>
  <LayoutRegistry main-class="v-patients-main">
    <PatientsTable
      class="v-patients-content__table"
      :items="items"
      :loading="loading"
      v-model:page="page.value"
      v-model:per-page="perPage.value"
      :total="total"
      :search="search.value" />
  </LayoutRegistry>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { mapState, mapActions } from 'vuex';
import { usePerPage, usePage, useSearch } from '@/hooks/query';
import { Patient } from '@/models/Patient.model';

import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LayoutRegistry, PatientsTable },

  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    search: useSearch(),
  }),
  computed: {
    ...mapState({
      loading: (state) => state.patients.loading,
      items: (state) => state.patients.data,
      total: (state) => state.patients.total,
    }),

    queryWatchers() {
      return {
        perPage: this.perPage.value,
        page: this.page.value,
        search: this.search.value,
      };
    },
  },
  watch: {
    queryWatchers: {
      handler(value, oldValue) {
        this.queryWatchersHandler(value, oldValue);
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      setLoading: 'patients/setLoading',
      setData: 'patients/setData',
    }),

    async getPatients() {
      this.setLoading(true);

      try {
        const { data } = await Patient.find({
          per_page: this.perPage.value,
          page: this.page.value,
          search: this.search.value,
          query_type: 'ILIKE',
          query_operator: 'OR',
          query_field: ['name', 'phone'],
        });
        this.setData({
          items: data.data,
          total: +data.meta.total,
          overwriteDataState: true,
        });
      } catch (err) {
        console.log(err);
        this.$notify({ title: err?.response?.data?.message || this.$t('Notifications.Error') });
      }

      this.setLoading(false);
    },

    queryWatchersHandler(value, oldValue) {
      if (
        value &&
        oldValue &&
        (value.perPage !== oldValue.perPage || value.search !== oldValue.search)
      ) {
        this.resetPage();
        return setTimeout(() => this.getPatients());
      }

      this.getPatients();
    },
    resetPage() {
      this.page.reset();
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
