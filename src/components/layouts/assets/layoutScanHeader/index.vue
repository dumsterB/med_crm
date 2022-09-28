<!-- TODO: delete -->
<template>
  <div class="layout-content-scan">
    <UiIcon :icon="icons.SCAN" />
    <span class="layout-content-scan__text">{{ $t('Base.ScanBracelet') }}</span>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'index',
  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
