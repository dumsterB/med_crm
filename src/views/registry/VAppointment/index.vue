<template>
  <LayoutRegistry content-class="v-patient-content"> PatientRecord </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';

export default {
  name: 'VAppointment',
  components: { LayoutRegistry },
  props: {
    id: [Number, String],
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
