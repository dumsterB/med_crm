<template>
  <div :class="['ui-avatar', `ui-avatar__${size}`]" :style="{ backgroundColor: avatar.bg }">
    <img
      v-if="!error"
      class="ui-avatar__image"
      draggable="false"
      loading="lazy"
      :src="image?.src || image?.url"
      :alt="image?.alt"
      @error="errorHandler"
      @load="loadHandler" />

    <img v-if="error" class="ui-avatar__image" :src="avatar.url" :alt="image?.alt" />
  </div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { getRandomAvatarBg, getRandomAvatarUrl } from '@/utils/avatar.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  props: {
    /**
     * @param { Object } image
     * @param { string } image.src
     * @param { string } image.url  synonym for image.src
     * @param { string } image.alt
     */
    image: Object,
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val),
    },
  },
  data() {
    return {
      loading: true,
      error: false,
      avatar: {
        url: '',
        bg: '',
      },
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

  mounted() {
    this.avatar.url = getRandomAvatarUrl();
    this.avatar.bg = getRandomAvatarBg();
  },
};
</script>

<style lang="scss" src="./index.scss" />
