<template #header>
  <ElCard class="v-patient-profile-card">
    <div class="v-patient-profile-card__item">
      <UiAvatar size="super-large" />
      <div class="v-patient-profile-card__item__profile">
        <ElTag class="v-patient-profile-card__item__profile__button">
          {{ $t('Base.Patient') }}
        </ElTag>
        <div class="v-patient-profile-card__item__profile__name">
          {{ data.name }}
        </div>
        <div class="v-patient-profile-card__item__profile__birthday">
          {{ data.birthdate }}
        </div>
      </div>
    </div>

    <div class="v-patient-profile-card__item">
      <div class="v-patient-profile-card__item__profile">
        <div class="v-patient-profile-card__item__profile__phone-label">
          {{ $t('User.Phone') }}
        </div>
        <div class="v-patient-profile-card__item__profile__phone">
          {{ data.phone }}
        </div>
      </div>
    </div>

    <div class="v-patient-profile-card__item last__item">
      <div class="v-patient-profile-card__item__actions">
        <div>
          <ElTag class="v-patient-profile-card__item__actions__create">
            <UiIcon :icon="$options.icons.PLUS" /> {{ $t('AddRecord') }}
          </ElTag>
        </div>
        <div>
          <ElTag class="v-patient-profile-card__item__actions__edit">
            {{ $t('Base.Edit') }}
          </ElTag>
        </div>
        <div>
          <ElTag class="v-patient-profile-card__item__actions__delete">
            {{ $t('Base.Delete') }}
          </ElTag>
        </div>
      </div>
    </div>
  </ElCard>
  <p class="v-patient-profile-appointment-description__title" v-if="data.childrens.length > 1">
    {{ $t('Children') }}
  </p>
  <div class="v-patient-profile-appointment-content">
    <ElCard class="v-patient-profile-appointment-card" v-for="child of data.childrens" :key="child.id">
      <div class="v-patient-profile-appointment-card-info">
        <UiAvatar size="super-large" />
        <div class="v-patient-profile-appointment-card-info-content">
          <div>
            <ElTag class="v-patient-profile-appointment-card-info-content__button">
              {{ $t('ChildrenText') }}
            </ElTag>
          </div>
          <div class="v-patient-profile-appointment-card-info-content__name">
            {{ child.name }}
          </div>
          <div class="v-patient-profile-appointment-card-info-content__birthdate">
            {{ child.birthdate ?  child.birthdate : '10.08.1977' }}
          </div>
        </div>
      </div>

      <ElDivider></ElDivider>

      <div class="v-patient-profile-appointment-card-info">
        <div class="v-patient-profile-appointment-card-info-content">
          <div class="v-patient-profile-appointment-card-info-content__parent-label">
            {{ $t('Parents') }}
          </div>
          <div class="v-patient-profile-appointment-card-info-content__parent">
            {{ data.name }}
<!--            <UiIcon-->
<!--              class="v-patient-profile-appointment-card__item__children__icon"-->
<!--              :icon="$options.icons.TRASH" />-->
          </div>
          <br />
          <div class="v-patient-profile-appointment-card-info-content__gender-label">
            {{ $t('Gender') }}
          </div>
          <div class="v-patient-profile-appointment-card-info-content__gender">
            {{ child.gender}}
          </div>
        </div>
      </div>

      <ElDivider></ElDivider>

      <div class="v-patient-profile-appointment-card-info">
        <div class="v-patient-profile-appointment-card-info-actions">
          <div>
            <ElButton class="v-patient-profile-appointment-card-info-actions-create">
              <UiIcon :icon="$options.icons.PLUS" /> {{ $t('AddRecord') }}
            </ElButton>
          </div>
          <div>
            <ElButton class="v-patient-profile-appointment-card-info-actions-edit">
              {{ $t('Base.Edit') }}
            </ElButton>
          </div>
          <div>
            <ElButton class="v-patient-profile-appointment-card-info-actions-delete">
              {{ $t('Base.Delete') }}
            </ElButton>
          </div>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';

export default {
  name: 'VPatientProfileCard',
  props: {
    data: {
      type: [User, Patient, Object],
      required: true,
    },
    profile: {
      type: [User, Patient, Object],
      required: true,
    },
  },
  icons: icons,
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
