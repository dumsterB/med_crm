<template>
  <LayoutAuth> Forgot page </LayoutAuth>
</template>
<style lang="scss" src="./index.scss" />

<i18n src="./index.locales.json" />

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import LayoutAuth from '@/components/layouts/LayoutAuth/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LayoutAuth },
};
</script>
