<template>
  <LayoutRegistry>
    <router-link to="/auth/login">Login</router-link>
  </LayoutRegistry>
</template>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LayoutRegistry },
};
</script>
