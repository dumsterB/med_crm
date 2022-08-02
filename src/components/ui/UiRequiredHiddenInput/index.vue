<template>
  <ElInput class="ui-required-hidden-input" :model-value="modelValue" required v-bind="$attrs" />
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  props: ['modelValue'],
};
</script>

<style lang="scss" src="./index.scss" />
