<template>
  <div class="ui-user-avatar-info">
    <UiAvatar class="ui-user-avatar-info__avatar" :image="user.avatar" size="large" />

    <div class="ui-user-avatar-info__content ui-user-avatar-info-content">
      <span class="ui-user-avatar-info-content__name">
        {{ user.name }}
      </span>

      <span v-show="secondaryFieldKey" class="ui-user-avatar-info-content__secondary">
        {{ user[secondaryFieldKey] }}
      </span>
    </div>
  </div>
</template>

<script>
import { User } from '@/models/User.model';
import { Patient } from '@/models/Patient.model';

export default {
  name: 'UiUserAvatarAndInfo',
  props: {
    user: [User, Patient, Object],
    secondaryFieldKey: String, // ключ-столбец от модели пользователя
    size: {
      type: String,
      default: 'medium',
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
