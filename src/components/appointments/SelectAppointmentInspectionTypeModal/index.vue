<template>
  <ElDialog
    :title="$t('Title')"
    width="500px"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <div class="select-appointment-inspection-type-modal-content">
      <ElButton plain @click="selectInspectionTypeHandler(Appointment.enum.inspectionTypes.Full)">
        {{ $t(`Appointments.InspectionTypes.${Appointment.enum.inspectionTypes.Full}`) }}
      </ElButton>
      <ElButton
        type="primary"
        @click="selectInspectionTypeHandler(Appointment.enum.inspectionTypes.Treatment)">
        {{ $t(`Appointments.InspectionTypes.${Appointment.enum.inspectionTypes.Treatment}`) }}
      </ElButton>
    </div>
  </ElDialog>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

export default {
  name: 'SelectAppointmentInspectionTypeModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
  },

  methods: {
    /** @param {Appointment.enum.inspectionTypes.Full|Appointment.enum.inspectionTypes.Treatment} type */
    selectInspectionTypeHandler(type) {
      this.$emit('action', new GlobalModalAction({ name: type }));
    },
  },

  setup: () => ({
    Appointment: Appointment,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
