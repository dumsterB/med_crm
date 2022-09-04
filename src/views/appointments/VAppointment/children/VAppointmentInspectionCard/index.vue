<template>
  <div>Inspection Card</div>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'VAppointmentInspectionCard',
  props: {
    appointment: [Appointment, Object],
  },
};
</script>
