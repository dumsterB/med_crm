<template>
  <ElDrawer
    :model-value="modelValue"
    :title="$t('Title')"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm label-position="top" @submit.prevent="createAppointment">
      <ElFormItem label="patient">
        <UiPatientsAutocompleteSearch
          v-model="appointment.patient_id"
          :defaultPatient="patient"
          :disabled="!!patient" />
      </ElFormItem>

      <ElFormItem label="select type">
        <ElRadioGroup v-model="appointmentType">
          <ElRadio :label="appointmentTypesEnum.Doctor">
            {{ $t(`Appointments.Types.${appointmentTypesEnum.Doctor}`) }}</ElRadio
          >
          <ElRadio :label="appointmentTypesEnum.Service">
            {{ $t(`Appointments.Types.${appointmentTypesEnum.Service}`) }}</ElRadio
          >
        </ElRadioGroup>
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
  emits: ['update:modelValue', 'action'],
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
      appointmentType: Appointment.enum.types.Doctor,
    };
  },
  computed: {
    appointmentTypesEnum: () => Appointment.enum.types,
    watchersForResetAppointment() {
      return [this.modelValue, this.appointmentType];
    },
  },
  watch: {
    watchersForResetAppointment: {
      handler() {
        this.appointment = new Appointment({ patient_id: this.patient.id });
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    createAppointment() {},
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
