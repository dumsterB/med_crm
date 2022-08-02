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
import { getParentFolderNameByPath } from '@/utils/vite.util';
import { AvatarService } from '@/services/avatar.sevice';
import { User } from '@/models/User.model';

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
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val),
    },

    /**
     * @param { User.gender } gender
     */
    gender: String,
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
    this.avatar.url = AvatarService.getRandomAvatarUrl({
      gender: this.gender || User.enum.genders.MAN,
    });
    this.avatar.bg = AvatarService.getRandomAvatarBg();
  },
};
</script>

<style lang="scss" src="./index.scss" />
