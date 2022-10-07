<template>
  <div class="patients-search-select-data-block">
    <PatientsSearchSelect
      v-show="!hideSelect"
      class="patients-search-select-data-block__search"
      :model-value="modelValue"
      :required="required"
      :disabled="disabled"
      :multiple="multiple"
      :default-item="defaultItem"
      @update:model-value="$emit('update:modelValue', $event)"
      @select="$emit('select', $event)" />

    <div class="patients-search-select-data-block__content">
      <ElFormItem :label="$t('User.FullName')">
        {{ defaultItem?.name || patient?.name || '....' }}
      </ElFormItem>

      <ElFormItem :label="$t('User.Phone')">
        {{ defaultItem?.phone || patient?.phone || '....' }}
      </ElFormItem>

      <slot name="content-append"> </slot>
    </div>
  </div>
</template>

<script>
import { Patient } from '@/models/Patient.model';
import PatientsSearchSelect from '@/components/patients/PatientsSearchSelect/index.vue';

export default {
  name: 'PatientsSearchSelectDataBlock',
  components: { PatientsSearchSelect },
  emits: ['update:modelValue', 'select'],
  props: {
    modelValue: Number,
    defaultItem: [Patient, Object],
    required: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    showCreateOption: Boolean,
    hideSelect: Boolean,
  },

  data() {
    return {
      patient: null,
    };
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
