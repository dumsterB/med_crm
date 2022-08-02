<template>
  <div class="app">
    <ElConfigProvider size="large">
      <RouterView />
      <GlobalModalsAndDrawers />
    </ElConfigProvider>

    <SVG />
  </div>
</template>

<script>
import { getFileNameByPath } from '@/utils/vite.util';
import { RouterView } from 'vue-router';
import { I18nService } from '@/services/i18n.service';
import { ElConfigProvider } from 'element-plus';
import SVG from '@/components/SVG.vue';
import GlobalModalsAndDrawers from '@/components/GlobalModalsAndDrawers/index.vue';

export default {
  name: getFileNameByPath(import.meta.url),
  components: { RouterView, ElConfigProvider, SVG, GlobalModalsAndDrawers },

  mounted() {
    I18nService.setLocaleFromStorage();
    this.$store.dispatch('auth/checkAndSetUserAndTokenFromClientStorage');
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
