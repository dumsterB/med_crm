<template>
  <div class="registry-header">
    <div class="registry-header-left-content">
      <PatientsSearch class="registry-header__search" />
    </div>
    <LayoutLanguageSwitcher></LayoutLanguageSwitcher>
    <LayoutNotificationHeader></LayoutNotificationHeader>

    <ElDivider direction="vertical" />
    <LayoutUserDropdown />
  </div>
</template>

<script>
import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';
import LayoutUserDropdown from '@/components/layouts/assets/LayoutUserDropdown/index.vue';
import LayoutLanguageSwitcher from '@/components/layouts/assets/LangSelect/index.vue';
import LayoutNotificationHeader from '@/components/layouts/assets/LayoutNotificationHeader/index.vue';
export default {
  name: 'RegistryHeader',
  components: {
    LayoutUserDropdown,
    PatientsSearch,
    LayoutLanguageSwitcher,
    LayoutNotificationHeader,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
