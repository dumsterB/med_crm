<template>
  <div class="app">
    <ElConfigProvider size="large">
      <RouterView />
      <GlobalModalsAndDrawers />
    </ElConfigProvider>

    <SVG />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { I18nService } from '@/services/i18n.service';
import { User } from '@/models/User.model';

import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import SVG from '@/components/SVG.vue';
import GlobalModalsAndDrawers from '@/components/GlobalModalsAndDrawers/index.vue';

export default {
  name: 'App',
  components: { RouterView, ElConfigProvider, SVG, GlobalModalsAndDrawers },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  watch: {
    'user.id': {
      handler() {
        if (this.user?.role === User.enum.roles.Doctor) {
          this.$store.dispatch('user/getDataFromStorage');
        }
      },
      immediate: true,
    },
  },

  created() {
    I18nService.setLocaleFromStorage();
    this.$store.dispatch('auth/checkAndSetUserAndTokenFromClientStorage');
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
