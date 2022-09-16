<template>
  <div class="avatar-and-info">
    <div class="avatar-and-info-content-img">
      <div
        :class="[`avatar-and-info-content-img`, `avatar-and-info-content_${size}`]"
        :style="{ backgroundColor: avatar.bg }">
        <img :class="`avatar-and-info-img_${size}`" :src="src?.length ? src : avatar.url" alt="" />
      </div>
    </div>
    <div class="avatar-and-info-content-info" v-if="user?.name">
      <ElDropdown trigger="click">
        <span class="avatar-and-info-content-info-private">
          <span class="avatar-and-info-content-info-private-name">
            {{ user.name }}
          </span>
          <span class="avatar-and-info-content-info-private-email">
            {{ user.email }}
          </span>
          <el-icon class="avatar-and-info-content-info-private-icon el-icon--right">
            <UiIcon :icon="icons.CHEVRON_DOWN" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<script>
import { AvatarService } from '@/services/avatar.sevice';
import { User } from '@/models/User.model';
import { Patient } from '@/models/Patient.model';
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'UiUserAvatarAndInfo',
  props: {
    src: String,
    size: {
      type: String,
      default: 'medium',
    },
    gender: {
      type: String,
      default: 'не найдено',
    },
    user: [User, Patient, Object],
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
      gender: this.user?.gender || this.gender || User.enum.genders.MAN,
    });
    this.avatar.bg = AvatarService.getRandomAvatarBg();
  },
  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
