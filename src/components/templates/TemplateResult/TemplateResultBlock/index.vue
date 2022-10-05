<template>
  <ElCard class="template-result-block" shadow="never">
    <div class="template-result-block__title">{{ block.label }}</div>

    <div class="template-result-block__content">
      <ElInput
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Input"
        :model-value="block.answer?.value"
        :placeholder="$t('Base.PleaseInput')"
        v-bind="block.meta"
        @update:model-value="updateValue"
        @change="$emit('change')" />

      <ElInput
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Textarea"
        :model-value="block.answer?.value"
        type="textarea"
        :placeholder="$t('Base.PleaseInput')"
        :rows="4"
        v-bind="block.meta"
        @update:model-value="updateValue"
        @change="$emit('change')" />

      <ElSelect
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Select"
        :model-value="block.answer?.value"
        v-bind="block.meta"
        @update:modelValue="updateValue"
        @select="$emit('change')">
        <ElOption
          v-for="option in block.options"
          :key="option.value"
          :label="option.label"
          :value="option.value" />
      </ElSelect>

      <ElCheckboxGroup
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Checkbox"
        :model-value="block.answer?.value || []"
        @update:model-value="updateValue"
        @change="$emit('change')">
        <ElCheckbox v-for="option in block.options" :key="option.label" :label="option.value">
          {{ option.label }}
        </ElCheckbox>
      </ElCheckboxGroup>

      <ElDatePicker
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Date"
        :model-value="block.answer?.value"
        value-format="DD.MM.YYYY"
        :placeholder="$t('Base.PleaseSelect')"
        @update:model-value="updateValue"
        @change="$emit('change')" />
    </div>
  </ElCard>
</template>

<script>
import { InspectionCardBlock } from '@/models/InspectionCardBlock.model';

export default {
  name: 'TemplateResultBlock',
  emits: ['update:block', 'change'],
  props: {
    block: [InspectionCardBlock, Object],
    editable: Boolean,
  },
  methods: {
    updateValue(value) {
      console.log(value);

      this.$emit('update:block', {
        ...this.block,
        answer: {
          value: value,
          isCustom: false,
        },
      });
    },
  },

  setup: () => ({
    InspectionCardBlock,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
