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
  <div class="app">
    <ElConfigProvider>
      <RouterView />
    </ElConfigProvider>
  </div>
</template>

<style src="./App.scss" lang="scss"></style>
