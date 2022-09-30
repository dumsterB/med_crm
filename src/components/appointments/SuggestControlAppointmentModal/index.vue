<template>
  <ElDialog
    :title="$t('Title')"
    :model-value="modelValue"
    width="500px"
    @update:model-value="$emit('update:modelValue', $event)">
    <div class="suggest-control-appointment-modal-content">
      <ElButton type="primary" @click="createControlAppointment">
        {{ $t('AppointControlAppointment') }}
      </ElButton>

      <ElButton @click="skip"> {{ $t('Base.Skip') }} </ElButton>
    </div>
  </ElDialog>
</template>

<script>
import { Doctor } from '@/models/Doctor.model';
import { Patient } from '@/models/Patient.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

import CreateOrEditAppointmentModal from '@/components/appointments/CreateOrEditAppointmentModal/index.vue';

export default {
  name: 'SuggestControlAppointmentModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    doctor: [Doctor, Object],
    patient: [Patient, Object],
  },

  methods: {
    skip() {
      this.$emit('update:modelValue', false);
    },

    async createControlAppointment() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateOrEditAppointmentModal,
        payload: {
          disableDefaultAction: true,
          data: {
            patient_id: this.patient.id,
            patient: this.patient,
            doctor_id: this.doctor.id,
            doctor: this.doctor,
          },
        },
      });
      if (action instanceof GlobalDrawerCloseAction) return;

      this.$emit(
        'action',
        new GlobalModalAction({
          name: 'created',
          data: { appointment: action.data.appointment },
        })
      );
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
