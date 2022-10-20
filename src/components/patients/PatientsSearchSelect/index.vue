<template>
  <div class="patients-search-select">
    <UiModelsAutocompleteSearch
      class="patients-search-select__component"
      :model-value="modelValue"
      :model-for-use="Patient"
      :default-item="defaultItem || scannedPatient"
      :formatter="onlyLatinFormatter"
      v-bind="$attrs"
      ref="component"
      @update:model-value="$emit('update:modelValue', $event)"
      @select="$emit('select', $event)"
      @create="$emit('create', $event)" />

    <ScanPatientBracelet :disabled="disabled" @scan:success="scanHandler" />
  </div>
</template>

<script>
import { onlyLatinFormatter } from '@/utils/formatters.util';
import { Patient } from '@/models/Patient.model';
import UiModelsAutocompleteSearch from '@/components/ui/UiModelsAutocompleteSearch/index.vue';
import ScanPatientBracelet from '@/components/scanner/ScanPatientBracelet/index.vue';

export default {
  name: 'PatientsSearchSelect',
  components: { ScanPatientBracelet, UiModelsAutocompleteSearch },
  emits: ['update:modelValue', 'select', 'create'],
  props: {
    modelValue: Number,
    disabled: Boolean,
    withScanner: Boolean,
    defaultItem: [Patient, Object, Array],
    // + пропсы для UiModelsAutocompleteSearch
  },
  data() {
    return {
      scannedPatient: null,
    };
  },
  watch: {
    modelValue(value, oldValue) {
      if (oldValue) this.scannedPatient = null;
    },
  },

  methods: {
    scanHandler({ patient }) {
      this.scannedPatient = patient;
      this.$emit('update:modelValue', patient.id);
      this.$emit('select', patient);
    },

    focus() {
      this.$refs.component.focus();
    },
    blur() {
      this.$refs.component.blur();
    },
  },

  setup: () => ({
    Patient: Patient,
    onlyLatinFormatter,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
