<template>
  <LayoutRegistry> Doctors Schedule </LayoutRegistry>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LayoutRegistry },
};
</script>
