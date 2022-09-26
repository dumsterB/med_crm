<template>
  <LayoutRegistry content-class="v-cash-content"> Cash </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';

export default {
  name: 'VCash',
  components: { LayoutRegistry },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
