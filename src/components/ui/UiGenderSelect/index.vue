<template>
  <div class="ui-gender-select">
    <div
      v-for="gender of genders"
      :key="gender.value"
      :class="[
        'ui-gender-select-item',
        { 'ui-gender-select-item_active': modelValue === gender.value },
      ]"
      @click="$emit('update:modelValue', gender.value)">
      <UiIcon class="ui-gender-select-item__icon" :icon="gender.icon" />
      <div class="ui-gender-select-item__label">{{ gender.label }}</div>
    </div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { User } from '@/models/User.model.js';

export default {
  name: 'UiGenderSelect',
  props: {
    modelValue: String,
  },
  computed: {
    genders() {
      return Object.keys(User.enum.genders).map((key) => ({
        label: this.$t(`User.Genders.${User.enum.genders[key]}`),
        value: User.enum.genders[key],
        icon: this.iconsByGender[User.enum.genders[key]],
      }));
    },

    iconsByGender() {
      return {
        [User.enum.genders.MAN]: icons.MALE,
        [User.enum.genders.Woman]: icons.FEMALE,
      };
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/user.locales.json" />
