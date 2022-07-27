<template>
  <div class="registry-header">Header <LangSelect /></div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import LangSelect from '@/components/LangSelect/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LangSelect },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
