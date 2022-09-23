<template>
  <div class="layout-content-language">
      <div class="layout-content-language-dropdawn">
        <UiIcon class="layout-content-language__icon" :icon="icons.RUSSIAN" />
        <span class="layout-content-language__text">Русский</span>
      </div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import './index.scss';

export default {
  name: 'index',
  currentLanguage: 'icons.RUSSIAN',
  setup: () => ({
    icons,
  }),
};
</script>

<style scoped></style>
