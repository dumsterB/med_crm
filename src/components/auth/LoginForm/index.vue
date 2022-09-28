<template>
  <form class="login-form" @submit.prevent="submitHandler">
    <div class="login-form-content">
      <div class="login-form-info">
        <p class="login-form-info__title">Авторизация!</p>
        <p class="login-form-info__text">Войдите в личный кабинет, для записи пациентов на прием</p>
      </div>
      <ElInput
        class="login-form-content__input"
        v-model="email"
        :placeholder="$t('Base.Login')"
        name="email"
        type="email"
        required>
      </ElInput>
      <ElInput
        v-model="password"
        :placeholder="$t('Base.Password')"
        name="password"
        type="password"
        required
        show-password>
      </ElInput>

      <div class="login-form__actions">
        <ElButton
          type="primary"
          class="login-form__actions-submit"
          :loading="loading"
          native-type="submit">
          {{ $t('LogIn') }}
        </ElButton>

        <router-link :to="FORGOT_PASSWORD_ROUTE.path">
          <ElButton text class="login-form__actions-forgot"> {{ $t('ForgotPassword') }}</ElButton>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { FORGOT_PASSWORD_ROUTE } from '@/router/auth.routes';
import { DASHBOARD_ROUTE } from '@/router/dashboard.routes';

export default {
  name: 'LoginForm',
  data() {
    return {
      loading: false,
      email: null,
      password: null,
    };
  },
  computed: {
    FORGOT_PASSWORD_ROUTE: () => FORGOT_PASSWORD_ROUTE,
  },

  methods: {
    async submitHandler() {
      if (this.loading) return;
      this.loading = true;

      try {
        await this.$store.dispatch('auth/logIn', { email: this.email, password: this.password });
        this.$router.push(DASHBOARD_ROUTE.path);
      } catch (err) {
        console.log(err);
        this.$notify({ title: err?.response?.data?.message || 'Error', type: 'error' });
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
