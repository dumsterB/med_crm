<template>
  <div class="layout-content-scan">
    <UiIcon :icon="icons.SCAN" />
    <span class="layout-content-scan__text">Сканер браслета</span>
  </div>
</template>

<script>
import './index.scss';
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'index',
  setup: () => ({
    icons,
  }),
};
</script>

<style scoped></style>
