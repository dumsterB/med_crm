<script>
import { getFileNameByMetaUrl } from '@/utils/vite.util';
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';

export default {
  name: getFileNameByMetaUrl(import.meta.url),
  components: { RouterView, ElConfigProvider },
};
</script>

<template>
  <ElConfigProvider>
    <RouterView />
  </ElConfigProvider>
</template>

<style src="./App.scss" lang="scss"></style>
