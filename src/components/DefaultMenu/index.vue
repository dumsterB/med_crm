<template>
  <div class="default-menu">
    <img class="default-menu__logo" src="@/assets/images/logo.svg" alt="logo" />

    <nav class="default-menu__nav default-menu-nav">
      <slot name="nav"> </slot>
    </nav>

    <div class="default-menu__actions default-menu-actions">
      <slot name="actions"></slot>

      <ElButton link @click="logout">
        <template #icon>
          <UiIcon :icon="icons.LOGOUT" />
        </template>

        {{ $t('Base.Logout') }}
      </ElButton>
    </div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'DefaultMenu',
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },

  setup: () => ({
    icons: icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
