<template>
  <ElCard
    :class="[
      'v-patient-profile-card',
      `v-patient-profile-card_${type}`,
      { 'v-patient-profile-card_children': isChildren },
    ]"
    shadow="hover"
    @click="goToPatient">
    <template #header>
      <UiAvatar size="super-large" />

      <div class="v-patient-profile-card__user v-patient-profile-card-user">
        <div class="v-patient-profile-card-user__name">
          {{ data.name }}
        </div>
        <div class="v-patient-profile-card-user__birthdate">
          {{ data.birthdate }}
        </div>
      </div>
    </template>

    <div class="v-patient-profile-card__content v-patient-profile-card-content">
      <div class="v-patient-profile-card-data" v-for="item in infoItems" :key="item.value">
        <div class="v-patient-profile-card-data__title">{{ item.label }}</div>
        <div class="v-patient-profile-card-data__value">{{ item.value }}</div>
      </div>
    </div>
    <div class="v-patient-profile-card__actions v-patient-profile-card-actions">
      <ElButton type="primary" @click.stop="editPatient">
        {{ $t('Base.Edit') }}
      </ElButton>
      <ElButton type="primary" @click.stop="treatmentHandler">
        {{ $t('Base.SetTreatment') }}
      </ElButton>
    </div>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer';
import CreateTreatmentModal from '@/components/treatment/CreateTreatmentModal/index.vue';

export default {
  name: 'VPatientPatientCard',
  icons: icons,
  props: {
    data: {
      type: [User, Patient, Object],
      required: true,
    },
    type: {
      type: String,
      validator: (val) => ['vertical', 'horizontal'].includes(val),
      default: 'vertical',
    },
  },
  data() {
    return {};
  },
  computed: {
    isChildren() {
      return !!this.data.parent_id;
    },

    infoItems() {
      return [
        {
          label: this.isChildren ? this.$t('User.Parent') : this.$t('User.Phone'),
          value: this.isChildren ? this.data.parent?.name : this.data.phone,
        },
        {
          label: this.$t('User.Gender'),
          value: this.data.gender?.length
            ? this.$t(`User.Genders.${this.data.gender}`)
            : this.$t('Base.Absent'),
        },
        {
          label: this.$t('User.Email'),
          value: this.data?.email?.length ? this.data.email : this.$t('Base.Absent'),
        },
      ];
    },
  },

  methods: {
    goToPatient() {
      this.$router.push({
        name: PATIENT_ROUTE.name,
        params: { id: this.data.id },
      });
    },

    async editPatient() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: {
          data: this.data,
        },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.$emit('update:data', action.data.patient);
    },

    async treatmentHandler() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateTreatmentModal,
        payload: {
          userId: this.data.id,
        },
      });
      if (action instanceof GlobalModalCloseAction) return;
      this.$emit('create:treatment', action.data.treatment);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
