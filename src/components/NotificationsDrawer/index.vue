<!-- TODO: переименовать -->
<template>
  <div class="layout-content-notification">
    <div class="layout-content-notification__item" @click="scanHandler">
      <UiIcon :icon="icons.NOTIFICATION" />
    </div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'NotificationsDrawer',
  setup: () => ({
    icons,
  }),
  methods: {
    scanHandler() {},
  },
};
</script>

<style lang="scss" src="./index.scss" />
