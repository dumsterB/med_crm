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

    <AmbulatoryCard
      class="v-patient-ambulatory__card"
      :patient="patient"
      @update:patient="updatePatientFromAmbulatoryCard" />
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum';
import { Patient } from '@/models/Patient.model';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import AmbulatoryCard from '@/components/patients/AmbulatoryCard/index.vue';

export default {
  name: 'VPatientAmbulatoryCard',
  components: { AmbulatoryCard, LayoutContentHeader },
  emits: ['update:patient'],
  props: {
    patient: [Patient, Object],
    /** @param {Array<Appointment|object>} appointments */
    appointments: Array,
    /** @param {{profile: boolean, appointment: boolean}} loading */
    loading: Object,
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
<i18n src="./index.locales.json" />
