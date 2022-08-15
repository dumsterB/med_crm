<template>
  <ElCard class="v-patient-appointment-card" v-for="appointment of data" :key="appointment.id">
    <template #header>
      <div class="v-patient-appointment-content-profile">
        <UiAvatar
          size="super-large"
          class="v-patient-appointment-profile__avatar"
          :image="{ src: appointment.doctor.avatar.link, alt: 'avatar' }" />
        <div class="v-patient-appointment-content-profile-info">
          <ElTag class="v-patient-appointment-content-profile__danger-button">
            {{ $t('Appointment') }}
          </ElTag>
          <p class="v-patient-appointment-content-profile__title">
            {{ appointment.doctor.name }}
          </p>
          <p
            class="v-patients-appointments-content-profile__text"
            v-for="specialties of appointment.doctor.specialties"
            :key="specialties">
            {{ specialties.title }}
          </p>
        </div>
      </div>
    </template>

    <div class="v-patient-appointment-content-info">
      <p class="v-patient-appointment-content-info__title">
        {{ $t('DateAndTine') }}
      </p>
      <p class="v-patients-appointments-content-info__text">
        {{ appointment.start_at }}
      </p>
      <p class="v-patient-appointment-content-info__title">
        {{ $t('Price') }}
      </p>
      <p class="v-patient-appointment-content-info__text">{{ appointment.service.price }} {{ $t('Base.Sum') }}</p>
    </div>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum';
import { Appointment } from '@/models/Appointment.model';
import { PriceService } from '@/services/price.service';

export default {
  name: 'VPatientAppointmentCard',
  props: {
    data: {
      type: [Appointment, Object],
      required: true,
    },
  },
  icons: icons,
  computed: {
    appointmentPrice() {
      return PriceService.formatPrice( 1000 );
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
