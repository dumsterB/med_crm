<template>
  <DefaultMenu :navigation="navigation" />
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { REGISTRY_PATIENTS_ROUTE } from '@/router/registry.routes';
import { DASHBOARD_ROUTE } from '@/router/dashboard.routes';
import { APPOINTMENTS_ROUTE } from '@/router/appointments.routes';
import DefaultMenu from '@/components/layouts/assets/DefaultMenu/index.vue';

export default {
  name: 'RegistryMenu',
  components: { DefaultMenu },
  computed: {
    navigation() {
      return [DASHBOARD_ROUTE, REGISTRY_PATIENTS_ROUTE, APPOINTMENTS_ROUTE].map((route) => ({
        path: route.path,
        title: this.routesOptionsByRouteName[route.name].text,
        icon: this.routesOptionsByRouteName[route.name].icon,
      }));
    },

    routesOptionsByRouteName() {
      return {
        [DASHBOARD_ROUTE.name]: {
          icon: icons.DASHBOARD,
          text: this.$t('Views.Dashboard.Title'),
        },
        [REGISTRY_PATIENTS_ROUTE.name]: {
          icon: icons.USER_TAG,
          text: this.$t('Base.Patients'),
        },
        [APPOINTMENTS_ROUTE.name]: {
          icon: icons.NOTE,
          text: this.$t('Views.Appointments.Title'),
        },
      };
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/views.locales.json" />
<i18n src="./index.locales.json" />
