<template>
  <div class="default-menu">
    <img class="default-menu__logo" src="@/assets/images/logo.svg" alt="logo" />

    <nav class="default-menu__nav default-menu-nav">
      <slot name="nav">
        <router-link
          class="default-menu-nav__item"
          v-for="route in navigation"
          :key="route.path"
          :to="route.path">
          <UiIcon :icon="route.icon" />
          <span>{{ route.title }}</span>
        </router-link>
      </slot>
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
  props: {
    /**
     * @param {Array<Object>} navigation
     * @param {string} navigation[].path
     * @param {string} navigation[].title
     * @param {string} navigation[].icon
     */
    navigation: Array,
  },
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
