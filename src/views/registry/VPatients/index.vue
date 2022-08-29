<template>
  <LayoutRegistry content-class="v-patients-content" fixHeight>
    <LayoutContentHeader>
      <template #actions>
        <ElButton type="primary" @click="createPatient"> {{ $t('Patients.AddPatient') }} </ElButton>
      </template>
    </LayoutContentHeader>

    <PatientsTable
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
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { Patient } from '@/models/Patient.model';

import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import LayoutContentHeader from '@/components/LayoutContentHeader/index.vue';

export default {
  name: 'VPatients',
  components: { LayoutContentHeader, LayoutRegistry, PatientsTable },
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
        compareQueriesThenLoadData({
          query: value,
          oldQuery: oldValue,
          resetPage: this.page.reset,
          getData: this.getPatients,
        });
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
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.setLoading(false);
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
