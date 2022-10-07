<template>
  <div class="patient-card">
    <ElCard :shadow="shadow" class="patient-card">
      <div class="patient-card-info" v-for="patient of items">
        <div class="patient-card-info_avatar" v-if="patient.avatar">
          <UiAvatar size="large" :gender="patient.avatar"></UiAvatar>
        </div>
          <div>
          <p class="patient-card-info__title">
            {{ patient.label }}
          </p>
          <p class="patient-card-info__description">
            {{ patient.value }}
          </p>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script>
export default {
  name: 'PatientCardRow',
  props: {
    items: Array,
    shadow: String,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/user.locales.json" />
