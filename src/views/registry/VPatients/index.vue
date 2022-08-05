<template>
  <LayoutRegistry content-class="v-patients-content" fixHeight>
    <div class="v-patients-content__header v-patients-content-header">
      <div class="v-patients-content-header-actions">
        <ElButton type="primary" @click="createPatient"> {{ $t('Patients.AddPatient') }} </ElButton>
      </div>
    </div>

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
import { mapState, mapActions } from 'vuex';
import { usePerPage, usePage, useSearch } from '@/hooks/query';
import { Patient } from '@/models/Patient.model';
import { REGISTRY_PATIENTS_ROUTE } from '@/router/registry.routes';

import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';

export default {
  name: 'VPatients',
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
      // почему-то срабатывает после логаута
      if (this.$route.name !== REGISTRY_PATIENTS_ROUTE.name) return;

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

    createPatient() {
      this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditPatientDrawer);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/patients.locales.json" />
