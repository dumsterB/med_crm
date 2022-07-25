<template>
  <LayoutAuth>
    <div class="v-login">
      <div>{{ $t('Login') }}</div>
    </div>
  </LayoutAuth>
</template>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util.js';
import LayoutAuth from '@/components/layouts/LayoutAuth/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LayoutAuth },
};
</script>
