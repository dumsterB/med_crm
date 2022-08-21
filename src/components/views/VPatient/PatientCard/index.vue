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
      <ElButton type="primary" @click.stop="createAppointment">
        <template #icon>
          <UiIcon :icon="$options.icons.PLUS" />
        </template>
        {{ $t('Appointments.CreateAppointment') }}
      </ElButton>

      <ElButton type="primary" plain @click.stop="editPatient">
        {{ $t('Base.Edit') }}
      </ElButton>
    </div>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';

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
          value: this.data.gender,
        },
        {
          label: this.$t('User.Email'),
          value: this.data.email,
        },
      ];
    },
  },

  methods: {
    goToPatient() {
      this.$router.push({
        name: REGISTRY_PATIENT_ROUTE.name,
        params: { id: this.data.id },
      });
    },

    createAppointment() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          patient: this.data,
        },
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
    deletePatient() {},
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
