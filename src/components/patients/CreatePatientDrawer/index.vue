<template>
  <ElDrawer
    :model-value="modelValue"
    title="Create Patient"
    :direction="direction"
    @update:model-value="$emit('update:modelValue', $event)">
    Create Patient
  </ElDrawer>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  props: {
    modelValue: Boolean,
    direction: String,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
