<template>
  <div class="ui-gender-select">
    <div
      v-for="gender of genders"
      :key="gender"
      :class="[gender.active === true ? 'ui-gender-select-active' : 'ui-gender-select-item']"
      @click="genderHandler(gender)">
      <UiIcon :icon="gender.value == 'man' ? icons.MALE : icons.FEMALE" />
      {{ gender.label }}
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
  data() {
    return {
      genders: [],
    };
  },
  methods: {
    genderHandler(gender) {
      this.genders.map((ell) => (ell.active = false));
      gender.active = !gender.active;
      this.$emit('update:modelValue', gender.value)
    },
  },
  mounted() {
    this.genders = Object.keys(User.enum.genders).map((key) => ({
      label: this.$t(`User.Genders.${User.enum.genders[key]}`),
      value: User.enum.genders[key],
      active: false,
    }));
  },
  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/user.locales.json" />
