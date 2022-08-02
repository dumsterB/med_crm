<template>
  <ElDrawer
    :model-value="modelValue"
    title="Create appointment"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm label-position="top" @submit.prevent="createAppointment">
      <ElFormItem label="patient">
        <ElSelect v-model="appointment.user_id">
          <ElOption
            v-for="user in [patient]"
            :key="user.id"
            :label="user.name"
            :value="user.id"
            disabled />
        </ElSelect>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script>
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'CreateAppointmentDrawer',
  props: {
    modelValue: Boolean,
    patient: [Patient, User, Object],
  },
  data() {
    return {
      /**
       * @type Appointment
       */
      appointment: null,
    };
  },
  watch: {
    modelValue: {
      handler() {
        this.appointment = new Appointment({ user_id: this.patient.id });
      },
      immediate: true,
    },
  },

  methods: {
    createAppointment() {},
  },
};
</script>
