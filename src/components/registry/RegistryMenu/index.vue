<template>
  <div class="registry-menu">
    <img class="registry-menu__logo" src="@/assets/images/logo_medium.png" alt="logo" />

    <nav class="registry-menu__nav registry-menu-nav">Nav</nav>

    <div class="registry-menu__actions registry-menu-actions">
      <ElButton link @click="logout">
        <template #icon>
          <UiIcon :icon="$options.icons.LOGOUT" />
        </template>

        {{ $t('Base.Logout') }}
      </ElButton>
    </div>
  </div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import * as icons from '@/enums/icons.enum.js';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  icons: icons,
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
