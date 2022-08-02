<template>
  <div class="registry-menu">
    <img class="registry-menu__logo" src="@/assets/images/logo_medium.png" alt="logo" />

    <nav class="registry-menu__nav registry-menu-nav">
      <router-link
        class="registry-menu-nav__item"
        v-for="route in navigation"
        :key="route.path"
        :to="route.path">
        <UiIcon :icon="route.icon" />
        <span>{{ route.title }}</span>
      </router-link>
    </nav>

    <div class="registry-menu__actions registry-menu-actions">
      <ElButton link @click="logout">
        <template #icon>
          <UiIcon :icon="$options.icons.LOGOUT" />
        </template>

        {{ $t('Base.Logout') }}
      </ElButton>
    </div>
  </div>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';
import * as icons from '@/enums/icons.enum.js';
import {
  REGISTRY_DASHBOARD_ROUTE,
  REGISTRY_PATIENTS_ROUTE,
  REGISTRY_PATIENTS_RECORDS_ROUTE,
  REGISTRY_DOCTORS_SCHEDULE_ROUTE,
} from '@/router/registry.routes';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  icons: icons,
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },

  computed: {
    navigation() {
      return [
        REGISTRY_DASHBOARD_ROUTE,
        REGISTRY_PATIENTS_ROUTE,
        REGISTRY_PATIENTS_RECORDS_ROUTE,
        REGISTRY_DOCTORS_SCHEDULE_ROUTE,
      ].map((route) => ({
        ...route,
        title: this.routesOptionsByRouteName[route.name].text,
        icon: this.routesOptionsByRouteName[route.name].icon,
      }));
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
        [REGISTRY_PATIENTS_RECORDS_ROUTE.name]: {
          icon: icons.NOTE,
          text: this.$t('Base.PatientsRecords'),
        },
        [REGISTRY_DOCTORS_SCHEDULE_ROUTE.name]: {
          icon: icons.BOARD,
          text: this.$t('Base.DoctorsSchedule'),
        },
      };
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
