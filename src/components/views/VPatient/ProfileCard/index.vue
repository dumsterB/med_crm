<template>
  <ElCard class="v-patients-content-card">
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
  </ElCard>
  <p class="v-patients-content-description__title" v-if="data.childrens.length > 1">
    {{ $t('Children') }}
  </p>
  <ElCard class="v-patients-content-card" v-for="child of data.childrens" :key="child.id">
        <div class="v-patients-content-card__item">
          <UiAvatar size="super-large" />
          <div class="v-patients-content-card__item__children">
            <div>
              <ElTag class="v-patients-content-card__item__children__button">
                {{ $t('ChildrenText') }}
              </ElTag>
            </div>
            <div class="v-patients-content-card__item__children__name">
              {{ child.name }}
            </div>
            <div class="v-patients-content-card__item__children__birthdate">
              {{ child.birthdate }}
            </div>
          </div>
        </div>
        <div class="v-patients-content-card__item">
          <div class="v-patients-content-card__item__children">
            <div class="v-patients-content-card__item__children__parent-label">
              {{ $t('Parents') }}
            </div>
            <div class="v-patients-content-card__item__children__parent">
              {{ data.name }}
              <UiIcon
                class="v-patients-content-card__item__children__icon"
                :icon="$options.icons.TRASH" />
            </div>
            <br />
            <div class="v-patients-content-card__item__children__gender-label">
              {{ $t('Gender') }}
            </div>
            <div class="v-patients-content-card__item__children__gender">
              Мужской {{ child.gender }}
            </div>
          </div>
        </div>
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
  </ElCard>
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
