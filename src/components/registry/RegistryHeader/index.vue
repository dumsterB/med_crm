<template>
  <div class="registry-header">
    <div class="registry-header-left-content">
      <PatientsSearch class="registry-header__search" />
    </div>
    <LangSelect></LangSelect>
    <NotificationsHeader></NotificationsHeader>

    <ElDivider direction="vertical" />
    <LayoutUserDropdown />
  </div>
</template>

<script>
import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';
import LayoutUserDropdown from '@/components/layouts/assets/LayoutUserDropdown/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';
import NotificationsHeader from '@/components/NotificationsDrawer/index.vue';

export default {
  name: 'RegistryHeader',
  components: {
    LangSelect,
    LayoutUserDropdown,
    PatientsSearch,
    NotificationsHeader,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
