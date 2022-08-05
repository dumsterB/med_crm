<template>
  <LayoutAuth content-class="v-login">
    <img class="v-login__image" src="@/assets/images/doctors.png" alt="doctors" />
    <LoginForm class="v-login__content" />
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth/index.vue';
import LoginForm from '@/components/auth/LoginForm/index.vue';

export default {
  name: 'VLogin',
  components: { LayoutAuth, LoginForm },
};
</script>

<style lang="scss" src="./index.scss" />
