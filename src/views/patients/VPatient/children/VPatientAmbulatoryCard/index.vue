<template>
  <div class="v-patient-ambulatory">
    <LayoutContentHeader>
      <ElPageHeader
        class="v-patient-ambulatory-header"
        :title="$t('Base.Back')"
        @back="goToPatient">
        <template #content>
          <div class="v-patient-ambulatory-header-info">
            <div>{{ $t('Base.AmbulatoryCard') }}</div>

            <ElButton type="primary" text @click="goToPatient"> {{ patient.name }} </ElButton>
          </div>
        </template>
      </ElPageHeader>
    </LayoutContentHeader>

    <PatientCardRow :items="infoItems" />

    <AmbulatoryCard
      class="v-patient-ambulatory__card"
      :patient="patient"
      :treatments="treatments"
      @update:patient="updatePatientFromAmbulatoryCard" />

    <TreatmentsTable
      :items="treatments"
      :total="treatments?.length"
      :perPage="treatments?.length"
      :page="1"
      :actionShow="true" />
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum';
import { Patient } from '@/models/Patient.model';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import AmbulatoryCard from '@/components/patients/AmbulatoryCard/index.vue';
import TreatmentsTable from '@/components/treatments/TreatmentsTable/index.vue';
import PatientCardRow from '@/components/patients/PatientCardRow/index.vue';

export default {
  name: 'VPatientAmbulatoryCard',
  components: { PatientCardRow, AmbulatoryCard, LayoutContentHeader, TreatmentsTable },
  emits: ['update:patient'],
  props: {
    patient: [Patient, Object],
    /** @param {Array<Appointment|object>} appointments */
    appointments: Array,
    /** @param {Array<Treatments|object>} treatments */
    treatments: Array,
    /** @param {{profile: boolean, appointment: boolean}} loading */
    loading: Object,
  },
  computed: {
    infoItems() {
      return [
        {
          gender: this.patient.gender,
          label: this.$t('Patients.NamePatient'),
          value: this.patient.name || '',
        },
        {
          label: this.$t('User.Phone'),
          value: this.patient.phone || '',
        },
        {
          label: this.$t('User.Birthdate'),
          value: this.patient.birthdate || '',
        },
        {
          label: this.$t('User.Gender'),
          value: this.$t('User.Genders.' + this.patient.gender) || '',
        },
      ];
    },
  },

  methods: {
    goToPatient() {
      this.$router.push({
        name: PATIENT_ROUTE.name,
        params: {
          id: this.patient.id,
        },
      });
    },

    updatePatientFromAmbulatoryCard(patient) {
      this.$emit('update:patient', patient);
      this.goToPatient();
    },
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
