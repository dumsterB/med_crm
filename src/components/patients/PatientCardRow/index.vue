<template>
  <ElCard class="patient-card" :shadow="shadow">
    <UiUserAvatarInfo class="patient-card__user" :user="patient" />

    <div class="patient-card__info patient-card-info" v-for="item in items" :key="item.value">
      <div class="patient-card-info__label">
        <slot name="label" :item="item">{{ item.label }}</slot>
      </div>
      <div class="patient-card-info__value">
        <slot name="value" :item="item">{{ item.value }}</slot>
      </div>
    </div>

    <div class="patient-card__actions patient-card-actions">
      <slot name="actions"></slot>
    </div>
  </ElCard>
</template>

<script>
import { Patient } from '@/models/Patient.model';

export default {
  name: 'PatientCardRow',
  props: {
    patient: [Patient, Object],
    /** @type {Array<{label: string, value: string|number}>} items */
    items: Array,
    shadow: {
      default: 'never',
      type: String,
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/user.locales.json" />
