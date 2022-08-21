<template>
  <div v-if="date" class="appointments-start-or-end-date__text">{{ date }}</div>
  <ElTag v-if="!date" type="warning" effect="dark" round>
    {{ $t('Appointments.LiveQueue') }}
  </ElTag>
</template>

<script>
export default {
  name: 'AppointmentStartOrEndDate',
  props: {
    date: String, // APP format
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/appointments.locales.json" />
