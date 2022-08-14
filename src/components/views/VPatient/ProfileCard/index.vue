<template>
  <div class="v-patients-content-card">
    <ElRow :loading="loading">
      <ElCol :span="8">
        <div class="v-patients-content-card__item">
          <UiAvatar size="super-large" />
          <div class="v-patients-content-card__item__profile">
            <ElTag class="v-patients-content-card__item__profile__button">
              {{ $t('Base.Patient') }}
            </ElTag>
            <div class="v-patients-content-card__item__profile__name">
              {{ data.name }}
            </div>
            <div class="v-patients-content-card__item__profile__birthday">
              {{ data.birthdate }}
            </div>
          </div>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="v-patients-content-card__item">
          <div class="v-patients-content-card__item__profile">
            <div class="v-patients-content-card__item__profile__phone-label">
              {{ $t('User.Phone') }}
            </div>
            <div class="v-patients-content-card__item__profile__phone">
              {{ data.phone }}
            </div>
          </div>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="v-patients-content-card__item last__item">
          <div class="v-patients-content-card__item__actions">
            <div>
              <ElTag class="v-patients-content-card__item__actions__create">
                <UiIcon :icon="$options.icons.PLUS" /> {{ $t('AddRecord') }}
              </ElTag>
            </div>
            <div>
              <ElTag class="v-patients-content-card__item__actions__edit">
                {{ $t('Base.Edit') }}
              </ElTag>
            </div>
            <div>
              <ElTag class="v-patients-content-card__item__actions__delete">
                {{ $t('Base.Delete') }}
              </ElTag>
            </div>
          </div>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
export default {
  name: 'ProfileCard',
  props: {
    data: {
      type: Object,
      required: true,
      default: {},
    },
    loading: {
      type: Boolean,
      require: true,
      default: {},
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
