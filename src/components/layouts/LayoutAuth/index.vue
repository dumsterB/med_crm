<template>
  <div class="layout-auth">
    <slot></slot>
  </div>
</template>

<style lang="scss" src="./index.scss" />

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
};
</script>
