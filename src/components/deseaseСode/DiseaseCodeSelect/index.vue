<template>
  <UiModelsAutocompleteSearch
    class="disease-code-select"
    :model-value="modelValue"
    :model-for-use="DiseaseCode"
    label="title"
    value="code"
    :required="required"
    v-bind="$attrs"
    ref="component"
    @update:model-value="$emit('update:modelValue', $event)"
    @select="$emit('select', $event)">
    <template #default="{ label, item }">
      <div class="disease-code-select-label">
        <span class="disease-code-select-label__code"> {{ item.code }} </span>
        <span> {{ label }} </span>
      </div>
    </template>
  </UiModelsAutocompleteSearch>
</template>

<script>
import { DiseaseCode } from '@/models/DiseasesCode.model';

export default {
  name: 'DiseaseCodeSelect',
  emits: ['update:modelValue', 'select'],
  props: {
    modelValue: [Number, Array],
    required: Boolean,
  },
  setup: () => ({
    DiseaseCode,
  }),
};
</script>

<style lang="scss" src="./index.scss"></style>
