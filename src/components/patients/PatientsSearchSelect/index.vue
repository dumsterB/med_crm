<template>
  <UiModelsAutocompleteSearch
    :model-value="modelValue"
    :model-for-use="Patient"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
    @select="$emit('select', $event)" />
</template>

<script>
import { Patient } from '@/models/Patient.model';
import UiModelsAutocompleteSearch from '@/components/ui/UiModelsAutocompleteSearch/index.vue';

export default {
  name: 'PatientsSearchSelect',
  components: { UiModelsAutocompleteSearch },
  emits: ['update:modelValue', 'select'],
  props: {
    modelValue: Number,
    withScanner: Boolean,
    // + пропсы для UiModelsAutocompleteSearch
  },

  setup: () => ({
    Patient: Patient,
  }),
};
</script>
