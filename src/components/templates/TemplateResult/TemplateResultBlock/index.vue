<template>
  <ElCard class="template-result-block" shadow="never">
    <div class="template-result-block__title">{{ block.label }}</div>

    <div class="template-result-block__content">
      <!--  Input  -->
      <ElInput
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Input"
        :model-value="block.answer?.value"
        :placeholder="$t('Base.PleaseInput')"
        v-bind="meta"
        @update:model-value="updateValue"
        @change="$emit('change')" />

      <!--  Textarea  -->
      <ElInput
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Textarea"
        :model-value="block.answer?.value"
        type="textarea"
        :placeholder="$t('Base.PleaseInput')"
        v-bind="meta"
        @update:model-value="updateValue"
        @change="$emit('change')" />

      <!--  Select  -->
      <ElSelect
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Select"
        :model-value="block.answer?.value"
        v-bind="meta"
        @update:modelValue="updateValue"
        @select="$emit('change')">
        <ElOption
          v-for="option in block.options"
          :key="option.value"
          :label="option.label"
          :value="option.value" />
      </ElSelect>

      <!--  Checkbox  -->
      <ElCheckboxGroup
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Checkbox"
        :model-value="block.answer?.value || []"
        @update:model-value="updateValue"
        @change="$emit('change')">
        <ElCheckbox
          v-for="option in block.options"
          :key="option.label"
          :label="option.value"
          :disabled="meta.disabled">
          {{ option.label }}
        </ElCheckbox>
      </ElCheckboxGroup>

      <!--  Date  -->
      <ElDatePicker
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.Date"
        :model-value="block.answer?.value"
        :disabled="block.meta.disabled"
        value-format="DD.MM.YYYY"
        :placeholder="$t('Base.PleaseSelect')"
        @update:model-value="updateValue"
        @change="$emit('change')" />

      <UiUpload
        v-if="block.answer_type === InspectionCardBlock.enum.answerTypes.File"
        class="template-result-block__file-upload"
        :files="files"
        :disabled="meta.disabled"
        :multiple="meta.multiple"
        @file:add="addFileHandler"
        @file:delete="deleteFileHandler" />
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
    readonly: Boolean,
  },
  computed: {
    meta() {
      return {
        ...this.block.meta,
        disabled: this.block.meta.disabled || this.readonly,
      };
    },

    files() {
      return this.block.answer?.value?.map((elem) => elem.file) || [];
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('update:block', {
        ...this.block,
        answer: {
          value: value,
          isCustom: false,
        },
      });
    },

    addFileHandler(file) {
      this.updateValue([
        ...(this.block.answer?.value || []),
        {
          file: file,
          comments: [],
        },
      ]);
      setTimeout(() => this.$emit('change'));
    },

    deleteFileHandler(id) {
      this.updateValue(this.block.answer?.value?.filter((elem) => elem.file.id !== id));
      setTimeout(() => this.$emit('change'));
    },
  },

  setup: () => ({
    InspectionCardBlock,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
