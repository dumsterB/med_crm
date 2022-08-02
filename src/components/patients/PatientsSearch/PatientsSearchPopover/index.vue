<template>
  <div class="patients-search-popover">
    <div
      v-show="!loading && !hasPatients"
      class="patients-search-popover__no-data patients-search-popover-no-data">
      <div class="patients-search-popover-no-data__title">{{ $t('Patients.NoPatient') }}</div>
      <div class="patients-search-popover-no-data__actions">
        <ElButton type="primary" @click="addPatient"> {{ $t('Patients.AddPatient') }} </ElButton>
      </div>
    </div>

    <table
      class="patients-search-popover__patients patients-search-popover-patients"
      v-show="!loading && hasPatients">
      <tbody>
        <PatientRow v-for="patient in patients" :key="patient.id" :patient="patient" />
      </tbody>
    </table>

    <div v-show="loading" class="patients-search-popover__loading">{{ $t('Base.Loading') }}</div>
  </div>
</template>

<script>
import PatientRow from '@/components/patients/PatientRow/index.vue';
import CreatePatientDrawer from '@/components/patients/CreatePatientDrawer/index.vue';

export default {
  name: 'PatientsSearchPopover',
  components: { PatientRow },
  props: {
    /**
     * @param { Array<Patient|object|Proxy> } patients
     */
    patients: Array,
    loading: Boolean,
    search: String,
  },
  computed: {
    hasPatients() {
      return !!this.patients.length;
    },
  },

  methods: {
    addPatient() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreatePatientDrawer,
        nameOrPhone: this.search,
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
