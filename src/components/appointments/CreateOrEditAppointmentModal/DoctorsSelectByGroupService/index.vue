<template>
  <ElSelect
    :model-value="serviceId"
    :placeholder="$t('Appointments.SelectDoctor')"
    @update:model-value="selectHandler">
    <ElOption
      v-for="service in services"
      :key="service.id"
      :label="service.doctor.name"
      :value="service.id" />
  </ElSelect>

  <UiRequiredHiddenInput :model-value="appointment.service_id" :required="required" />
</template>

<script>
import { ServiceGroup } from '@/models/ServiceGroup.model';
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'DoctorsSelectByServiceGroup',
  emits: ['update:appointment'],
  props: {
    appointment: [Appointment, Object],
    serviceGroup: [ServiceGroup, Object],
    required: Boolean,
  },
  computed: {
    services() {
      return this.serviceGroup?.services || [];
    },

    serviceId() {
      return this.appointment.service_ids?.length ? this.appointment.service_ids[0] : null;
    },
  },

  methods: {
    selectHandler(serviceId) {
      const doctorId = this.services.find((service) => service.id == serviceId)?.doctor_id;
      this.$emit('update:appointment', {
        ...this.appointment,
        doctor_id: doctorId,
        service_ids: [serviceId],
      });
    },
  },
};
</script>

<i18n src="@/locales/appointments.locales.json" />
