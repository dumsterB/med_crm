<template>
  <ElDialog
    :title="$t('Title')"
    :model-value="modelValue"
    width="500px"
    @update:modelValue="$emit('update:modelValue', $event)">
    <div class="suggest-treatment-modal-content">
      <ElButton type="primary" @click="success"> {{ $t('Success') }} </ElButton>
      <ElButton @click="cancel">{{ $t('Cancel') }}</ElButton>
    </div>
  </ElDialog>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

export default {
  name: 'SuggestTreatmentModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    appointment: [Appointment, Object],
  },

  methods: {
    success() {
      this.$emit('action', new GlobalModalAction({ name: 'success' }));
    },
    cancel() {
      this.$emit('update:modelValue', false);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
