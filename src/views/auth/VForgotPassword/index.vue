<template>
  <LayoutAuth content-class="v-forgot-password">
    <img class="v-forgot-password__image" src="@/assets/images/forgot-password.png" alt="image" />
    <ForgotPassword class="v-forgot-password__content" @action:prev="prevHandler" />
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth/index.vue';
import ForgotPassword from '@/components/auth/ForgotPassword/index.vue';

export default {
  name: 'VForgotPassword',
  components: { LayoutAuth, ForgotPassword },

  methods: {
    prevHandler() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
