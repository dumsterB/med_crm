<template>
  <span class="ui-icon">
    <svg class="ui-icon__content">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
  </span>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  props: {
    icon: String, // id символов из SVG
  },
};
</script>

<style lang="scss" src="./index.scss" />
