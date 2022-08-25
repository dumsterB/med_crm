<template>
  <div class="doctors-header">
    <LangSelect class="lang" />
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect/index.vue';

export default {
  name: 'RegistryHeader',
  components: { LangSelect },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
