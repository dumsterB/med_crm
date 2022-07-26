<template>
  <div class="registry-header">Header</div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
