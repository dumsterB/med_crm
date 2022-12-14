<template>
  <LayoutByUserRole content-class="v-patients-content" fixHeight>
    <LayoutContentHeader>
      <div v-if="isDoctor" class="v-patients-content-actions">
        <ElButton :type="findForDoctor.value ? 'primary' : ''" @click="findForDoctor.value = 1">
          {{ $t('Patients.MyPatients') }}
        </ElButton>

        <ElButton :type="!findForDoctor.value ? 'primary' : ''" @click="findForDoctor.value = 0">
          {{ $t('Patients.ClinicPatients') }}
        </ElButton>
      </div>

      <template #actions>
        <ElButton v-if="!isDoctor" type="primary" @click="createPatient">
          {{ $t('Patients.AddPatient') }}
        </ElButton>
      </template>
    </LayoutContentHeader>

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
import { useQuery } from '@/hooks/useQuery.hook';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';
import { Doctor } from '@/models/Doctor.model';

import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';
import CreateOrEditPatientModal from '@/components/patients/CreateOrEditPatientModal/index.vue';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';

export default {
  name: 'VPatients',
  components: { LayoutContentHeader, PatientsTable, LayoutByUserRole },
  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    search: useSearch(),
    findForDoctor: useQuery({ field: 'doctor', valueIsNumber: true }),
  }),
  data() {
    return {
      patientsClinic: false,
    };
  },
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
        findForDoctor: this.findForDoctor.value,
      };
    },
  },
  watch: {
    'queryWatchers': {
      handler(value, oldValue) {
        compareQueriesThenLoadData({
          query: value,
          oldQuery: oldValue,
          resetPage: this.page.reset,
          getData: this.getPatients,
          fieldsForResetPage: ['findForDoctor'],
        });
      },
      immediate: true,
      deep: true,
    },

    'user.role': {
      handler(value) {
        if (value === User.enum.roles.Doctor) this.findForDoctor.value = 1;
      },
      immediate: true,
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
        search: this.search.value?.trim(),
        query_type: 'ILIKE',
        query_operator: 'OR',
        query_field: ['name', 'phone'],
      };

      try {
        const { data } = !!this.findForDoctor.value
          ? await Doctor.getPatients(this.user.doctor_id, payload)
          : await Patient.find(payload);
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

    getPatientsHandler() {
      this.patientsClinic = !this.patientsClinic;
      this.getPatients();
    },

    createPatient() {
      this.$store.dispatch('modalAndDrawer/openModal', CreateOrEditPatientModal);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/patients.locales.json" />
