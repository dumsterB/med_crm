<template>
  <ElInput
    :model-value="phone"
    type="number"
    v-bind="$attrs"
    @update:model-value="updateModelValue">
    <template #prefix> + </template>
  </ElInput>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  props: {
    modelValue: String,
  },
  computed: {
    phone() {
      return this.modelValue?.replace(/^\+*/, '');
    },
  },

  methods: {
    updateModelValue(value) {
      this.$emit('update:modelValue', `+${value}`.replace(/^\+*/, '+'));
    },
  },
};
</script>
