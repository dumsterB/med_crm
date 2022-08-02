<template>
  <LayoutRegistry> Patients Records </LayoutRegistry>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  components: { LayoutRegistry },
};
</script>
