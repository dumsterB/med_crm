<template>
  <div class="layout-content-notification">
    <div @click="scanHandler" class="layout-content-notification__item">
      <UiIcon :icon="icons.NOTIFICATION" />
    </div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'index',
  setup: () => ({
    icons,
  }),
  methods:{
    scanHandler(){

    }
  }
};
</script>

<style lang="scss" src="./index.scss" />
