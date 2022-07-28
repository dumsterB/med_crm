<template>
  <div class="patients-search-popover">
    <div
      v-show="!loading && !hasPatients"
      class="patients-search-popover__no-data patients-search-popover-no-data">
      <div class="patients-search-popover-no-data__title">{{ $t('Patients.NoPatient') }}</div>
      <div class="patients-search-popover-no-data__actions">
        <ElButton type="primary" plain> {{ $t('Patients.AddPatient') }} </ElButton>
        <ElButton type="primary"> {{ $t('Base.InviteByNumber') }} </ElButton>
      </div>
    </div>

    <table
      class="patients-search-popover__patients patients-search-popover-patients"
      v-show="!loading && hasPatients">
      <tbody>
        <PatientRow v-for="patient in patients" :key="patient.id" :patient="patient" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import PatientRow from '@/components/patients/PatientRow/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
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
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
