<template>
  <div :class="['ui-image']">
    <img
      v-if="!error"
      class="ui-image__image"
      draggable="false"
      loading="lazy"
      :src="image?.src || image?.url"
      :alt="image?.alt"
      @error="errorHandler"
      @load="loadHandler" />

    <!--    <img
      v-if="error"
      class="ui-image__image"
      src="@/images/assets/image-error.png"
      :alt="image?.alt" />-->
  </div>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  props: {
    /**
     * @param { Object } image
     * @param { string } image.src
     * @param { string } image.url  synonym for image.src
     * @param { string } image.alt
     */
    image: Object,
  },
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  watch: {
    image: {
      handler(value) {
        if (!value || !value.src || !value.url) this.error = true;
      },
      immediate: true,
    },
  },

  methods: {
    loadHandler() {
      this.loading = false;
    },
    errorHandler() {
      this.loading = false;
      this.error = true;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
