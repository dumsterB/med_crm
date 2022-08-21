<template>
  <ElCard class="v-patient-appointment-card" shadow="hover" @click="goToAppointment">
    <template #header>
      <div class="v-patient-appointment-card-header">
        <UiAvatar size="super-large" :image="{ src: data.doctor.avatar.link, alt: 'avatar' }" />

        <div class="v-patient-appointment-card__doctor v-patient-appointment-card-doctor">
          <div class="v-patient-appointment-card-doctor__name">
            {{ data.doctor.name }}
          </div>

          <div class="v-patient-appointment-card-doctor__specialties">
            <span v-for="(specialties, index) of data.doctor.specialties" :key="specialties">
              {{ index !== 0 ? ', ' : '' }}{{ specialties.title }}
            </span>
          </div>
        </div>
      </div>
    </template>

    <div class="v-patient-appointment-card-data" v-for="item in infoItems" :key="item.value">
      <div class="v-patient-appointment-card-data__title">{{ item.label }}</div>
      <div class="v-patient-appointment-card-data_-value">{{ item.value }}</div>
    </div>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum';
import { Appointment } from '@/models/Appointment.model';
import { PriceService } from '@/services/price.service';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';

export default {
  name: 'VPatientAppointmentCard',
  icons: icons,
  props: {
    data: {
      type: [Appointment, Object],
      required: true,
    },
  },
  computed: {
    appointmentPrice() {
      return PriceService.formatPrice({ price: this.data.service?.price || 0 });
    },
    infoItems() {
      return [
        {
          label: this.$t('Appointments.StartDateAndTime'),
          value: this.data.start_at,
        },
        {
          label: this.$t('Base.Price'),
          value: this.appointmentPrice,
        },
      ];
    },
  },

  methods: {
    goToAppointment() {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          patientId: this.data.patient_id,
          id: this.data.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
