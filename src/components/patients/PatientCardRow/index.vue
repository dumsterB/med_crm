<template>
  <div class="patient-card">
    <ElCard class="patient-card">
      <div class="patient-card-info" v-for="(item, i) of infoItems" :key="i">
        <div class="patient-card-info_avatar" v-if="item.avatar">
          <div>
            <UiAvatar size="large" :gender="item.avatar"></UiAvatar>
          </div>
        </div>
        <div>
          <p class="patient-card-info__title">
            {{ item.label }}
          </p>
          <p class="patient-card-info__description">
            {{ item.value }}
          </p>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script>

export default {
  name: 'index',
  props: {
    patient: Object,
  },
  computed: {
    infoItems() {
      return [
        {
          avatar: this.patient.gender,
          label: this.$t('Patients.NamePatient'),
          value: this.patient.name || '',
        },
        {
          label: this.$t('User.Phone'),
          value: this.patient.phone || '',
        },
        {
          label: this.$t('User.Birthdate'),
          value: this.patient.birthdate || '',
        },
        {
          label: this.$t('User.Gender'),
          value: this.$t('User.Genders.' + this.patient.gender)  || '',
        },
      ];
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/user.locales.json" />
