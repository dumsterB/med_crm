<template>
  <ElRow gutter="20">
    <ElCol
      v-for="appointment of data"
      :key="appointment.id"
      class="grid-content v-patients-appointments-content__col"
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      :xl="8">
      <div class="v-patients-appointments-content_card">
        <div class="v-patients-appointments-content_profile">
          <UiAvatar size="super-large" :img="appointment.doctor.avatar.link" />
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
        <hr class="v-patients-appointments-content_card__divider" />
        <div class="v-patients-appointments-content_profile">
          <div class="v-patients-appointments-content_info">
            <p class="v-patients-appointments-content_profile__title">
              {{ $t('DateAndTine') }}
            </p>
            <p class="v-patients-appointments-content_profile__text"> {{appointment.start_at}}  </p>
            <p class="v-patients-appointments-content_profile__title">
              {{ $t('Price') }}
            </p>
            <p class="v-patients-appointments-content_profile__text">{{appointment.service.price}}</p>
          </div>
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>

<script>
import * as icons from '@/enums/icons.enum';
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
};
</script>

<style scoped></style>
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
