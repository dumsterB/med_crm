<template>
<div class="layout-content-notification">
   <div class="layout-content-notification__item">
     <UiIcon :icon="icons.NOTIFICATION" />
   </div>
</div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import './index.scss'

export default {
  name: "index",
  setup: () => ({
    icons,
  }),
}
</script>

<style scoped>

</style>