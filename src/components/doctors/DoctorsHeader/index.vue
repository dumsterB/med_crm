<template>
  <div class="doctors-header">
    <div class="doctors-header-left-content">
      <PatientsSearch class="doctors-header__search" />
    </div>
    <LangSelect></LangSelect>
    <!--    <NotificationsDrawer></NotificationsDrawer>-->

    <RouterLink
      v-if="showActiveAppointmentPageLink"
      class="doctors-header__appointment-btn"
      :to="activeAppointmentPageLink">
      <ElButton type="primary">
        <template #icon> <UiIcon :icon="icons.CHEVRON_LEFT" /> </template>
        {{ $t('GoToAppointment') }}
      </ElButton>
    </RouterLink>

    <ElDivider direction="vertical" />
    <LayoutUserDropdown class="doctors-header__dropdown" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import { insertRouteParams } from '@/utils/router.utils';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';

import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';
import LayoutUserDropdown from '@/components/layouts/assets/LayoutUserDropdown/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';
import NotificationsDrawer from '@/components/NotificationsDrawer/index.vue';

export default {
  name: 'RegistryHeader',
  components: {
    LayoutUserDropdown,
    PatientsSearch,
    LangSelect,
    NotificationsDrawer,
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),

    activeAppointmentPageLink() {
      return insertRouteParams({
        path: APPOINTMENT_ROUTE.path,
        params: { id: this.user?.active_appointment?.id },
      });
    },
    showActiveAppointmentPageLink() {
      return (
        this.user.has_active_appointment &&
        ![
          APPOINTMENT_ROUTE.name,
          APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_DEFAULT_CARD.name,
          APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_INSPECTION_CARD,
          APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_TREATMENT_CARD.name,
        ].includes(this.$route.name)
      );
    },
  },

  setup: () => ({
    icons: icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
