<template>
  <div class="patient-card">
    <ElCard :shadow="shadow" class="patient-card">
      <div class="patient-card-info" v-for="patient of items">
        <div class="patient-card-info_avatar" v-if="patient.gender">
          <UiAvatar size="large" :gender="patient.gender"></UiAvatar>
        </div>
        <div>
          <p class="patient-card-info__title">
            {{ patient.label }}
          </p>
          <p class="patient-card-info__description">
            {{ patient.value }}
          </p>
          <div class="patient-card-info-actions">
            <ElButton type="primary" v-if="patient.action">{{patient.text}}</ElButton>
          </div>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script>
import {insertRouteParams} from "@/utils/router.utils";
import {PATIENT_ROUTE} from "@/router/patients.routes";

export default {
  name: 'PatientCardRow',
  props: {
    items: Array,
    shadow: {
      default: 'never',
      type: String,
    },
  },
  computed:{
    ambulatoryCardPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.childrenMap.PATIENT_ROUTE_AMBULATORY_CARD._fullPath,
        params: { id: this.data.id, },
      });
    },
  }
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/user.locales.json" />
