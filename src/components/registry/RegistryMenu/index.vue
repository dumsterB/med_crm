<template>
  <div class="registry-menu">
    <img class="registry-menu__logo" src="@/assets/images/logo_medium.png" alt="logo" />

    <nav class="registry-menu__nav registry-menu-nav">Nav</nav>

    <div class="registry-menu__actions registry-menu-actions">
      <ElButton link @click="logout"> {{ $t('Base.Logout') }} </ElButton>
    </div>
  </div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
