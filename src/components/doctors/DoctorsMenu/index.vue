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
import { DOCTORS_QUEUE_ROUTE } from '@/router/doctors.routes';
import DefaultMenu from '@/components/DefaultMenu/index.vue';

export default {
  name: 'DoctorsMenu',
  components: { DefaultMenu },
  computed: {
    navigation() {
      return [DOCTORS_QUEUE_ROUTE].map(
        (route) => ({
          ...route,
          title: this.routesOptionsByRouteName[route.name].text,
          icon: this.routesOptionsByRouteName[route.name].icon,
        })
      );
    },

    routesOptionsByRouteName() {
      return {
        [DOCTORS_QUEUE_ROUTE.name]: {
          icon: icons.DOCTORS_QUEUE,
          text: this.$t('Base.Queue'),
        },
      };
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
