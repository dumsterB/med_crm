<template>
  <div class="registry-header">
    <PatientsSearch class="registry-header__search" />
    <LangSelect />
  </div>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';
import LangSelect from '@/components/LangSelect/index.vue';
import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  components: { LangSelect, PatientsSearch },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
