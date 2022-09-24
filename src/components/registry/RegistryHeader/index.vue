<template>
  <div class="registry-header">
    <div class="registry-header-left-content">
      <PatientsSearch  class="registry-header__search" />
      <LayoutScanHeader class="registry-header__scan"></LayoutScanHeader>
    </div>
    <LayoutLanguageSwitcher></LayoutLanguageSwitcher>
    <LayoutNotificationHeader></LayoutNotificationHeader>
    <div class="registry-header__divider"></div>
    <LayoutUserDropdown />
  </div>
</template>

<script>
import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';
import LayoutUserDropdown from '@/components/layouts/assets/LayoutUserDropdown/index.vue';
import LayoutLanguageSwitcher from '@/components/layouts/assets/LayoutLanguageSwitcher/index.vue';
import LayoutNotificationHeader from '@/components/layouts/assets/LayoutNotificationHeader/index.vue';
import LayoutScanHeader from '@/components/layouts/assets/layoutScanHeader/index.vue';
export default {
  name: 'RegistryHeader',
  components: {
    LayoutUserDropdown,
    PatientsSearch,
    LayoutLanguageSwitcher,
    LayoutNotificationHeader,
    LayoutScanHeader,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
