<template>
  <!--  <ElSelect-->
  <!--    class="ui-gender-select"-->
  <!--    :model-value="modelValue"-->
  <!--    v-bind="$attrs"-->
  <!--    @update:model-value="$emit('update:modelValue', $event)">-->
  <!--    <ElOption-->
  <!--      v-for="gender in genders"-->
  <!--      :key="gender.value"-->
  <!--      :label="gender.label"-->
  <!--      :value="gender.value" />-->
  <!--  </ElSelect>-->
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

  computed: {
    genders() {
      return Object.keys(User.enum.genders).map((key) => ({
        label: this.$t(`User.Genders.${User.enum.genders[key]}`),
        value: User.enum.genders[key],
        active: false,
      }));
    },
  },
  methods: {
    genderHandler(gender) {
      gender.active = !gender.active;
      console.log(gender);
    },
  },
  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/user.locales.json" />
