<template>
  <div class="ui-user-avatar-info">
    <UiAvatar
      class="ui-user-avatar-info__avatar"
      :image="user.avatar"
      size="large"
      :gender="user.gender" />

    <div class="ui-user-avatar-info__content ui-user-avatar-info-content">
      <span class="ui-user-avatar-info-content__name">
        {{ user.name }}
      </span>

      <span v-show="secondaryFieldKey" class="ui-user-avatar-info-content__secondary">
        {{ user[secondaryFieldKey] }}
      </span>
    </div>

    <ElTag
      v-show="showHasTreatment && user.has_treatment"
      class="ui-user-avatar-info__tag"
      type="success"
      effect="dark"
      round>
      {{ $t('Patients.HasTreatment') }}
    </ElTag>
  </div>
</template>

<script>
import { User } from '@/models/User.model';
import { Patient } from '@/models/Patient.model';

export default {
  name: 'UiUserAvatarInfo',
  props: {
    user: [User, Patient, Object],
    secondaryFieldKey: String, // ключ-столбец от модели пользователя
    size: {
      type: String,
      default: 'medium',
    },
    showHasTreatment: Boolean,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/patients.locales.json" />
