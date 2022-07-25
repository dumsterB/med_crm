<template>
  <div class="app">
    <ElConfigProvider size="large">
      <RouterView />
    </ElConfigProvider>
  </div>
</template>

<script>
import { getFileNameByMetaUrl } from '@/utils/vite.util';
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import { I18nService } from '@/services/i18n.service';

export default {
  name: getFileNameByMetaUrl(import.meta.url),
  components: { RouterView, ElConfigProvider },

  mounted() {
    I18nService.setLocaleFromStorage();
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
