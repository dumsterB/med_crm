<template>
  <ElCard
    class="v-patients-appointments-content__card"
    v-for="appointment of data"
    :key="appointment.id">
    <div>
    <div class="v-patients-appointments-content_profile">
      <UiAvatar size="super-large" class="v-patients-appointments-content_profile__avatar" :img="appointment.doctor.avatar.link" />
      <div class="v-patients-appointments-content_profile_info">
        <ElTag class="v-patients-appointments-content_profile__danger-button">
          {{ $t('Appointment') }}
        </ElTag>
        <p class="v-patients-appointments-content_profile__title">
          {{ appointment.doctor.name }}
        </p>
        <p
          class="v-patients-appointments-content_profile__text"
          v-for="specialties of appointment.doctor.specialties"
          :key="specialties">
          {{ specialties.title }}
        </p>
      </div>
    </div>
    <el-divider class="v-patients-appointments-content_card__divider" />
    <div class="v-patients-appointments-content_profile">
      <div class="v-patients-appointments-content_info">
        <p class="v-patients-appointments-content_profile__title">
          {{ $t('DateAndTine') }}
        </p>
        <p class="v-patients-appointments-content_profile__text">
          {{ dateFormatter(appointment.start_at) }}
        </p>
        <p class="v-patients-appointments-content_profile__title">
          {{ $t('Price') }}
        </p>
        <p class="v-patients-appointments-content_profile__text">
          {{ appointment.service.price }}
        </p>
      </div>
    </div>
    </div>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum';
import { Appointment } from '@/models/Appointment.model';
export default {
  name: 'AppointmentCard',
  props: {
    data: {
      type: Array,
      required: true,
      default: [],
    },
  },
  icons: icons,
  computed: {},
  methods: {
    dateFormatter(value) {
      return Appointment.getStartDate(value);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
