<template>
  <div class="app">
    <ElConfigProvider size="large">
      <RouterView />
    </ElConfigProvider>

    <SVG />
  </div>
</template>

<script>
import { getFileNameByMetaUrl } from '@/utils/vite.util';
import { RouterView } from 'vue-router';
import { I18nService } from '@/services/i18n.service';
import { ElConfigProvider } from 'element-plus';
import SVG from '@/components/SVG.vue';

export default {
  name: getFileNameByMetaUrl(import.meta.url),
  components: { RouterView, ElConfigProvider, SVG },

  mounted() {
    I18nService.setLocaleFromStorage();
    this.$store.dispatch('auth/checkAndSetUserAndTokenFromClientStorage');
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
