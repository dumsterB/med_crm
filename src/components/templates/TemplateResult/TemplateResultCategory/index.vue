<template>
  <ElCard class="template-result-category" shadow="never">
    <div class="template-result-category__title">{{ category.label }}</div>
    <div class="template-result-category__blocks">
      <TemplateResultBlock
        v-for="block in blocks"
        :key="block.id"
        :block="block"
        @update:block="$emit('update:block', $event)"
        @change="$emit('change')" />
    </div>
  </ElCard>
</template>

<script>
import { InspectionCardCategory } from '@/models/InspectionCardCategory.model';
import TemplateResultBlock from '@/components/templates/TemplateResult/TemplateResultBlock/index.vue';

export default {
  name: 'TemplateResultCategory',
  components: { TemplateResultBlock },
  emits: ['update:block', 'change'],
  props: {
    category: [InspectionCardCategory, Object],
    /** @type {Array<InspectionCardBlock|object>} blocks */
    blocks: Array,
    editable: Boolean,
  },
};
</script>

<style lang="scss" src="./index.scss" />
