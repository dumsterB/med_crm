<template>
  <LayoutRegistry content-class="v-patients-content" fixHeight fixWidth>
    <div class="v-patients-content__header v-patients-content-header">
      <div class="v-patients-content-header-filters">
        <el-select v-model="value" class="v-patients-content-header-filters__field" :placeholder="$t('Appointments.Types.selectDoctor')" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-select v-model="value" class="v-patients-content-header-filters__field2" :placeholder="$t('Appointments.Types.selectStatus')" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="v-patients-content-header-actions">
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
import CreateOrEditPatientDrawer from "@/components/patients/CreateOrEditPatientDrawer/index.vue";
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
          total: +data.meta.total,
          overwriteDataState: true,
        });
      } catch (err) {
        console.log(err);
        this.$notify({ title: err?.response?.data?.message || this.$t('Notifications.Error') });
      }

      this.setLoading(false);
    },
    createRecord() {
      this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditPatientDrawer);
    },
  },
};
</script>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />

