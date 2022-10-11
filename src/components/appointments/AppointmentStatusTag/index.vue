<template>
  <ElTag :type="options.type" effect="dark" round>
    {{ options.label }}
  </ElTag>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'AppointmentStatusTag',
  props: {
    status: String,
  },
  computed: {
    options() {
      let statusTagType = null;
      let statusTagIcon = null;

      switch (this.status) {
        case Appointment.enum.statuses.Created: {
          statusTagType = 'info';
          break;
        }
        case Appointment.enum.statuses.Approved: {
          statusTagType = '';
          break;
        }
        case Appointment.enum.statuses.Waiting: {
          statusTagType = 'warning';
          break;
        }
        case Appointment.enum.statuses.InProgress: {
          statusTagType = '';
          break;
        }
        case Appointment.enum.statuses.Provided: {
          statusTagType = 'success';
          break;
        }
        case Appointment.enum.statuses.Canceled: {
          statusTagType = 'danger';
          break;
        }
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
