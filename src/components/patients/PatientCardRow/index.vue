<template>
  <div class="patient-card">
    <ElCard class="patient-card">
      <div class="patient-card-info_avatar">
        <div>
          <UiAvatar size="large" :gender="patient.gender"></UiAvatar>
        </div>
        <div>
          <p class="patient-card-info__title">
            {{ $t('Patients.NamePatient') }}
          </p>
          <p class="patient-card-info__description">
            {{ patient.name }}
          </p>
        </div>
      </div>
      <div class="patient-card-info">
        <p class="patient-card-info__title">
          {{ $t('User.Phone') }}
        </p>
        <p class="patient-card-info__description">
          {{ patient.phone }}
        </p>
      </div>
      <div class="patient-card-info">
        <p class="patient-card-info__title">
          {{ $t('User.Birthdate') }}
        </p>
        <p class="patient-card-info__description">
          {{ patient.birthdate }}
        </p>
      </div>
      <div class="patient-card-info">
        <p class="patient-card-info__title">
          {{ $t('User.Gender') }}
        </p>
        <p class="patient-card-info__description">
          {{ patient.gender }}
        </p>
      </div>
    </ElCard>
  </div>
</template>

<script>
export default {
  name: 'index',
  props:{
    patient: {},
  }
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/user.locales.json" />
