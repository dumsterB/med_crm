<template>
  <div class="patients-search-popover">
    <div v-show="noData" class="patients-search-popover__no-data">No data</div>

    Popover
  </div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  props: {
    search: String,
    noData: Boolean,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/i18n.locales.json" />
<i18n src="./index.locales.json" />
