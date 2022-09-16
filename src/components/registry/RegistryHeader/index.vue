<template>
  <div class="registry-header">
    <PatientsSearch class="registry-header__search" />
    <LayoutUserDropdown />
  </div>
</template>

<script>
import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';
import LayoutUserDropdown from '@/components/layouts/assets/LayoutUserDropdown/index.vue';

export default {
  name: 'RegistryHeader',
  components: { LayoutUserDropdown, PatientsSearch },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
