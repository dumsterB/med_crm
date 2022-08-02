<template>
  <LayoutAuth content-class="v-login">
    <img class="v-login__image" src="@/assets/images/doctors.png" alt="doctors" />
    <LoginForm class="v-login__content" />
  </LayoutAuth>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util.js';
import LayoutAuth from '@/components/layouts/LayoutAuth/index.vue';
import LoginForm from '@/components/LoginForm/index.vue';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  components: { LayoutAuth, LoginForm },
};
</script>

<style lang="scss" src="./index.scss" />
