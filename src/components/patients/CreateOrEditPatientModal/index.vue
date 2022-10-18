<template>
  <ElDialog
    :model-value="modelValue"
    width="550px"
    custom-class="create-or-edit-patient-modal"
    :title="data && data.id ? $t('Patients.EditPatient') : $t('Patients.AddPatient')"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)">
    <CreateOrEditPatient
      class="create-or-edit-patient-modal__content"
      :model-value="modelValue"
      :name-or-phone="nameOrPhone"
      :data="data"
      :disabled-default-action="disableDefaultAction"
      @update:model-value="$emit('update:modelValue', $event)"
      @action="$emit('action', $event)" />
  </ElDialog>
</template>

<script>
import CreateOrEditPatient from './CreateOrEditPatient/index.vue';
import { Patient } from '@/models/Patient.model';

export default {
  name: 'CreateOrEditPatientModal',
  components: { CreateOrEditPatient },
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    nameOrPhone: String,
    data: [Patient, Object],

    disableDefaultAction: Boolean, // отключаем дефолтное поведение после создания
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
