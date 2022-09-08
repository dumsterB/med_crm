<template>
  <div class="v-app-treat-ins-card">
    <LayoutContentHeader>
      <ElPageHeader
        class="v-app-treat-ins-card-header"
        :title="$t('Base.Back')"
        @back="goToAppointment">
        <template #content>
          <div class="v-app-ins-card-header-info">
            <span> Text </span>

            <RouterLink :to="patientPageLink">
              <ElButton type="primary" text> {{ appointment.patient.name }} </ElButton>
            </RouterLink>
          </div>
        </template>
      </ElPageHeader>
    </LayoutContentHeader>
  </div>
</template>

<script>
import { insertRouteParams } from '@/utils/router.utils';
import { Appointment } from '@/models/Appointment.model';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { PATIENT_ROUTE } from '@/router/patients.routes';

import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';

export default {
  name: 'VAppointmentTreatmentInspectionCard',
  components: { LayoutContentHeader },
  emits: ['update:appointment'],
  props: {
    appointment: [Appointment, Object],
  },

  computed: {
    patientPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
        params: { id: this.appointment.patient_id },
      });
    },
  },

  methods: {
    goToAppointment() {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: this.appointment.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
