<template>
  <div class="v-app-ins-card">
    <LayoutContentHeader>
      <ElPageHeader
        class="v-app-ins-card-header"
        :title="$t('Base.Back')"
        @back="goToAppointmentDefaultCard">
        <template #content>
          {{ $t('Base.InspectionCard') }}
        </template>
      </ElPageHeader>
    </LayoutContentHeader>

    <DefaultInspectionCard
      :appointment="appointment"
      :readonly="isProvided"
      @update:appointment="$emit('update:appointment', $event)"
      @appointment:provide="$emit('appointment:provide')"
      @appointment:set:diagnosis="$emit('appointment:set:diagnosis')" />
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { insertRouteParams } from '@/utils/router.utils';
import { Appointment } from '@/models/Appointment.model';

import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import DefaultInspectionCard from '@/components/appointments/DefaultInspectionCard/index.vue';

export default {
  name: 'VAppointmentDefaultInspectionCard',
  emits: ['update:appointment', 'appointment:provide', 'appointment:set:diagnosis'],
  components: { DefaultInspectionCard, LayoutContentHeader },
  props: {
    appointment: [Appointment, Object],
  },
  computed: {
    isProvided() {
      return this.appointment.status === Appointment.enum.statuses.Provided;
    },

    appointmentDefaultCardPageLink() {
      return insertRouteParams({
        path: APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_DEFAULT_CARD._fullPath,
        params: {
          id: this.appointment.id,
        },
      });
    },

    patientPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
        params: {
          id: this.appointment.patient_id,
        },
      });
    },
  },
  watch: {
    'appointment.status': {
      handler(value) {
        if (
          (value &&
            ![Appointment.enum.statuses.InProgress, Appointment.enum.statuses.Provided].includes(
              value
            )) ||
          this.appointment.treatment_id
        )
          return this.$router.push(this.appointmentDefaultCardPageLink);
      },
      immediate: true,
    },
  },

  methods: {
    goToAppointmentDefaultCard() {
      this.$router.push(this.appointmentDefaultCardPageLink);
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
