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

    <InspectionCardComponent
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
import { InspectionCard } from '@/models/InspectionCard.model';
import { NOT_REDIRECT } from '@/enums/query.enum';

import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import InspectionCardComponent from '@/components/appointments/InspectionCard/index.vue';

export default {
  name: 'VAppointmentInspectionCard',
  emits: ['update:appointment', 'appointment:provide', 'appointment:set:diagnosis'],
  components: { InspectionCardComponent, LayoutContentHeader },
  props: {
    appointment: [Appointment, Object],
  },
  computed: {
    isProvided() {
      return this.appointment.status === Appointment.enum.statuses.Provided;
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
          this.appointment.inspection_card?.type === InspectionCard.enum.types.Treatment // TODO: удалить после объединения
        )
          this.goToAppointmentDefaultCard();
      },
      immediate: true,
    },
  },

  methods: {
    goToAppointmentDefaultCard() {
      this.$router.push({
        name: APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_DEFAULT_CARD.name,
        params: { id: this.appointment.id },
        query: { [NOT_REDIRECT]: 1 },
      });
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
