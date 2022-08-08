<template>
  <LayoutRegistry content-class="v-patient-content">
    {{ PatientRecord }}
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry';

export default {
  name: 'VPatientRecord',
  components: { LayoutRegistry },
  props: {
    id: [Number, String],
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/base.locales.json" />
<i18n src="./index.locales.json" />
