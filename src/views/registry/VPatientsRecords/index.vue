<template>
  <LayoutRegistry content-class="v-patients-records-content" fixHeight >
    <div class="v-patients-records-content__header v-patients-records-content-header">
      <div class="v-patients-records-content-header-filters">
        <elSelect v-model="value" class="v-patients-records-content-header-filters__field" :placeholder="$t('Appointments.SelectDoctor')" size="large">
          <elOption
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </elSelect>
        <elSelect v-model="value" class="v-patients-records-content-header-filters__field2" :placeholder="$t('Appointments.SelectStatus')" size="large">
          <elOption
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </elSelect>
      </div>
      <div class="v-patients-records-content-header-actions">
        <ElButton type="primary" @click="createRecord"> {{ $t('Patients.AddPatient') }} </ElButton>
      </div>
    </div>
    <patientsRecordsTable
      class="v-patients-records-content__table"
      :items="items"
      v-model:page="page.value"
      v-model:per-page="perPage.value"
      :total="total"
      :search="search.value" />
  </LayoutRegistry>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import patientsRecordsTable from '@/components/patientsRecords/patientsRecordsTable/index.vue';
import { usePage, usePerPage, useSearch } from '@/hooks/query';
import { Appointment } from '@/models/Appointment.model.js';
import CreateOrEditAppointmentDrawer from "@/components/appointments/CreateOrEditAppointmentDrawer";
export default {
  name: 'VPatientsRecords',
  components: { LayoutRegistry, patientsRecordsTable },

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
  },
  watch: {
    queryWatchers: {
      handler(value, oldValue) {
        this.getPatientsRecords();
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

    async getPatientsRecords() {
      this.setLoading(true);
      try {
        const { data } = await Appointment.find({
          per_page: this.perPage.value,
          page: this.page.value,
          search: this.search.value,
          query_type: 'ILIKE',
          query_operator: 'OR',
          query_field: ['name', 'phone'],
        });
        this.setData({
          items: data.data,
          total: + data.meta.total,
          overwriteDataState: true,
        });
      } catch (err) {
        console.log(err);
        this.$notify({ title: err?.response?.data?.message || this.$t('Notifications.Error') });
      }

      this.setLoading(false);
    },
    createRecord() {
      this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditAppointmentDrawer);
    },
  },
};
</script>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />

