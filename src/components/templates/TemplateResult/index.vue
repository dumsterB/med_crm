<template>
  <div class="template-result">
    <template v-for="item in blocksInCategories" :key="item.id">
      <TemplateResultCategory
        v-if="item.type === InspectionCardElement.enum.types.Category"
        class="template-result__category"
        :category="item"
        :blocks="item.blocks"
        :readonly="readonly"
        @update:block="updateBlock"
        @change="$emit('change')" />

      <TemplateResultBlock
        v-if="item.type === InspectionCardElement.enum.types.Block"
        class="template-result__block"
        :block="item"
        :readonly="readonly"
        @update:block="updateBlock"
        @change="$emit('change')" />
    </template>
  </div>
</template>

<script>
import { InspectionCardElement } from '@/models/InspectionCardElement.model';
import TemplateResultBlock from './TemplateResultBlock/index.vue';
import TemplateResultCategory from './TemplateResultCategory/index.vue';

export default {
  name: 'TemplateResult',
  components: { TemplateResultCategory, TemplateResultBlock },
  emits: ['update:modelValue', 'change'],
  props: {
    /** @type {Array<InspectionCardCategory|InspectionCardBlock|object>} modelValue */
    modelValue: [Array],
    readonly: Boolean,
  },

  computed: {
    blocksInCategories() {
      return this.modelValue
        .map(
          /** @param {InspectionCardCategory|InspectionCardBlock|object} elem */
          (elem) => {
            if (elem.type === InspectionCardElement.enum.types.Category) {
              return {
                ...elem,
                blocks: this.modelValue.filter((item) => item.category_id === elem.id),
              };
            }

            return elem;
          }
        )
        .filter((elem) => !elem.category_id);
    },
  },

  methods: {
    /** @param {InspectionCardBlock|object} block */
    updateBlock(block) {
      const index = this.modelValue.findIndex((elem) => elem.id === block.id);

      this.$emit('update:modelValue', [
        ...this.modelValue.slice(0, index),
        block,
        ...this.modelValue.slice(index + 1),
      ]);
    },
  },

  setup: () => ({
    InspectionCardElement,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
