<template>
  <LayoutRegistry>
    <PatientsTable :items="items" :loading="loading" />
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
    perPageValue: usePerPage(),
    page: usePage(),
  }),
  computed: {
    ...mapState({
      loading: (state) => state.patients.loading,
      items: (state) => state.patients.data,
      total: (state) => state.patients.total,
    }),

    watchers() {
      return [this.perPage, this.page];
    },
  },
  watch: {
    watchers: {
      handler() {
        this.getPatients();
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
      if (this.loading) return;
      this.setLoading(true);

      try {
        const { data } = await Patient.find({
          per_page: this.perPage.value,
          page: this.page.value,
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
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
