<template>
  <DefaultMenu :navigation="navigation" />
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { PATIENTS_ROUTE } from '@/router/patients.routes';
import { DASHBOARD_ROUTE } from '@/router/dashboard.routes';
import { APPOINTMENTS_ROUTE } from '@/router/appointments.routes';
import { CASH_ROUTE } from '@/router/cash.routes';
import DefaultMenu from '@/components/layouts/assets/DefaultMenu/index.vue';

export default {
  name: 'RegistryMenu',
  components: { DefaultMenu },
  computed: {
    navigation() {
      return [APPOINTMENTS_ROUTE, DASHBOARD_ROUTE, PATIENTS_ROUTE, CASH_ROUTE].map((route) => ({
        path: route.path,
        title: this.routesOptionsByRouteName[route.name].text,
        icon: this.routesOptionsByRouteName[route.name].icon,
      }));
    },

    routesOptionsByRouteName() {
      return {
        [APPOINTMENTS_ROUTE.name]: {
          icon: icons.NOTE,
          text: this.$t('Views.Appointments.Title'),
        },
        [DASHBOARD_ROUTE.name]: {
          icon: icons.DASHBOARD,
          text: this.$t('Views.Dashboard.Title'),
        },
        [PATIENTS_ROUTE.name]: {
          icon: icons.USER_TAG,
          text: this.$t('Base.Patients'),
        },
        [CASH_ROUTE.name]: {
          icon: icons.WALLET_OUTLINE,
          text: this.$t('Base.CashRegister'),
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
