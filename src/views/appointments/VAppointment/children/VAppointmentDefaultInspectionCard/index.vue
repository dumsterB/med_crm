<template>
  <div class="v-app-ins-card">
    <LayoutContentHeader>
      <!--  TODO: заменить на ElPageHeader  -->
      <div class="v-app-ins-card-header">
        <RouterLink :to="appointmentDefaultCardPageLink">
          <ElButton text>
            <template #icon>
              <UiIcon :icon="icons.CHEVRON_LEFT" />
            </template>
            {{ $t('Base.Back') }}
          </ElButton>
        </RouterLink>

        <div class="v-app-ins-card-header-info">
          <span>{{ $t('Base.Inspection') }}:</span>
          <RouterLink :to="patientPageLink">
            <ElButton type="primary" text>
              {{ appointment.patient?.name }}
            </ElButton>
          </RouterLink>
        </div>
      </div>
    </LayoutContentHeader>

    <DefaultInspectionCard
      :appointment="appointment"
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

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
