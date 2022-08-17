<template>
  <DefaultMenu>
    <template #nav>
      <router-link v-for="route in navigation" :key="route.path" :to="route.path">
        <UiIcon :icon="route.icon" />
        <span>{{ route.title }}</span>
      </router-link>
    </template>
  </DefaultMenu>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import {
  REGISTRY_DASHBOARD_ROUTE,
  REGISTRY_PATIENTS_ROUTE,
  REGISTRY_APPOINTMENTS_ROUTE,
} from '@/router/registry.routes';
import DefaultMenu from '@/components/DefaultMenu/index.vue';

export default {
  name: 'RegistryMenu',
  components: { DefaultMenu },
  computed: {
    navigation() {
      return [REGISTRY_DASHBOARD_ROUTE, REGISTRY_PATIENTS_ROUTE, REGISTRY_APPOINTMENTS_ROUTE].map(
        (route) => ({
          ...route,
          title: this.routesOptionsByRouteName[route.name].text,
          icon: this.routesOptionsByRouteName[route.name].icon,
        })
      );
    },

    routesOptionsByRouteName() {
      return {
        [REGISTRY_DASHBOARD_ROUTE.name]: {
          icon: icons.DASHBOARD,
          text: this.$t('Base.Dashboard'),
        },
        [REGISTRY_PATIENTS_ROUTE.name]: {
          icon: icons.USER_TAG,
          text: this.$t('Base.Patients'),
        },
        [REGISTRY_APPOINTMENTS_ROUTE.name]: {
          icon: icons.NOTE,
          text: this.$t('Base.PatientsRecords'),
        },
      };
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
