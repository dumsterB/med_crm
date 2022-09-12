<template>
  <div
    :class="['user-avatar-and-info', `user-avatar-and-info-content_${size}`]"
    :style="{ backgroundColor: avatar.bg }">
    <img :class="`user-avatar-and-info-img_${size}`" :src="src?.length ? src : avatar.url" alt="" />
  </div>
</template>

<script>
import { AvatarService } from '@/services/avatar.sevice';
import { User } from '@/models/User.model';

export default {
  name: 'UserAvatarAndInfo',
  props: {
    src: {
      type: String,
    },
    size: {
      type: String,
      default: 'md',
    },
    gender: {
      type: String,
      default: 'не найдено',
    },
  },
  data() {
    return {
      avatar: {
        url: '',
        bg: '',
      },
    };
  },
  methods: {},
  mounted() {
    this.avatar.url = AvatarService.getRandomAvatarUrl({
      gender: this.gender || User.enum.genders.MAN,
    });
    this.avatar.bg = AvatarService.getRandomAvatarBg();
  },
};
</script>

<style lang="scss" src="./index.scss" />
