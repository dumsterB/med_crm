<template>
  <LayoutByUserRole content-class="v-patients-content" fixHeight>
    <div class="v-patients-content__header v-patients-content-header">
      <div class="v-patients-content-header-actions">
        <ElButton v-if="!isDoctor" type="primary" @click="createPatient">
          {{ $t('Patients.AddPatient') }}
        </ElButton>
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
  </LayoutByUserRole>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { usePerPage, usePage, useSearch } from '@/hooks/query';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { Patient } from '@/models/Patient.model';
import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import { useQuery } from '@/hooks/useQuery.hook';
import { User } from '@/models/User.model';

export default {
  name: 'VPatients',
  components: { PatientsTable, LayoutByUserRole },
  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    search: useSearch(),
    findForDoctor: useQuery({ field: 'doctor' }),
  }),
  computed: {
    ...mapState({
      loading: (state) => state.patients.loading,
      items: (state) => state.patients.data,
      total: (state) => state.patients.total,
      user: (state) => state.auth.user,
    }),

    isDoctor() {
      return this.user.role === User.enum.roles.Doctor;
    },

    queryWatchers() {
      return {
        perPage: this.perPage.value,
        page: this.page.value,
        search: this.search.value,
        findForDoctor: this.findForDoctor.value
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
      const payload = {
        per_page: this.perPage.value,
        page: this.page.value,
        search: this.search.value,
        query_type: 'ILIKE',
        query_operator: 'OR',
        query_field: ['name', 'phone'],
      };
      try {
        const { data } = this.findForDoctor ? await Doctor.getPatient(payload) :  await Patient.find(payload);
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
