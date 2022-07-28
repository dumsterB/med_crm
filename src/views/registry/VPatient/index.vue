<template>
  <LayoutRegistry> Patient </LayoutRegistry>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LayoutRegistry },
  props: {
    id: [Number, String],
  },

  watch: {
    id: {
      handler(value) {
        // this.getUser()
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
