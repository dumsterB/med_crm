<template>
  <div>{{ $t('Login') }}</div>
</template>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util.js';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
};
</script>
