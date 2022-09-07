<template>
  <DefaultMenu :navigation="navigation" />
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { DASHBOARD_ROUTE } from '@/router/dashboard.routes';
import {
  DOCTORS_QUEUE_ROUTE,
  DOCTORS_TEMPLATES_ROUTE,
  DOCTORS_SETTINGS_ROUTE,
} from '@/router/doctors.routes';
import { PATIENTS_ROUTE } from '@/router/patients.routes';
import DefaultMenu from '@/components/layouts/assets/DefaultMenu/index.vue';

export default {
  name: 'DoctorsMenu',
  components: { DefaultMenu },
  computed: {
    navigation() {
      return [DASHBOARD_ROUTE, DOCTORS_QUEUE_ROUTE, PATIENTS_ROUTE, DOCTORS_TEMPLATES_ROUTE].map(
        (route) => ({
          path: route.path,
          title: this.routesOptionsByRouteName[route.name].text,
          icon: this.routesOptionsByRouteName[route.name].icon,
        })
      );
    },

    routesOptionsByRouteName() {
      return {
        [DASHBOARD_ROUTE.name]: {
          icon: icons.DASHBOARD,
          text: this.$t('Base.Dashboard'),
        },
        [DOCTORS_QUEUE_ROUTE.name]: {
          icon: icons.NOTE,
          text: this.$t('Base.Queue'),
        },
        [PATIENTS_ROUTE.name]: {
          icon: icons.USER_TAG,
          text: this.$t('Base.Patients'),
        },
        [DOCTORS_TEMPLATES_ROUTE.name]: {
          icon: icons.NOTE,
          text: this.$t('Base.Templates'),
        },
        [DOCTORS_SETTINGS_ROUTE.name]: {
          icon: icons.NOTE,
          text: this.$t('Base.Settings'),
        },
      };
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
