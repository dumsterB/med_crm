<template>
  <ElTag :type="options.type" effect="dark" round>
    {{ options.label }}
  </ElTag>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';
import * as icons from '@/enums/icons.enum';

export default {
  name: 'AppointmentStatusTag',
  props: {
    status: String,
  },
  computed: {
    options() {
      let statusTagType = 'success';
      let statusTagIcon = icons.DOUBLE_CHECKER;

      if (this.status === Appointment.enum.statuses.Canceled) {
        statusTagType = 'danger';
        statusTagIcon = icons.CANCELED_ROUND;
      }
      if (this.status === Appointment.enum.statuses.Provided) {
        statusTagType = 'warning';
        statusTagIcon = icons.PROVIDED;
      }

      return {
        label: this.$t(`Appointments.Statuses.${this.status}`),
        type: statusTagType,
        icon: statusTagIcon,
      };
    },
  },
};
</script>

<i18n src="@/locales/appointments.locales.json" />
