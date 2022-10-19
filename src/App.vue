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
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';

import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import { EmitterService } from '@/services/emitter.service';
import { API_LOGOUT_EMIT } from '@/enums/emits.enum';

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
          this.getDoctorTemplates();
        }
      },
      immediate: true,
    },
  },
  methods: {
    addGlobalEventListeners() {
      EmitterService.on(API_LOGOUT_EMIT, () => this.$store.dispatch('auth/logout'));
    },

    async getDoctorTemplates() {
      InspectionCardTemplate.find({}).then((response) => {
        this.$store.dispatch('templates/setData', {
          items: response.data.data,
          total: response.data.data.length,
        });
      });

      InspectionCardTemplate.getTreatmentTemplate().then((response) => {
        this.$store.dispatch('templates/setTreatmentTemplate', response.data.data);
      });
    },
  },

  created() {
    I18nService.setLocaleFromStorage();
    this.$store.dispatch('auth/checkAndSetUserAndTokenFromClientStorage');

    this.addGlobalEventListeners();
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
