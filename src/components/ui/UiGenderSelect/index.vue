<template>
  <ElSelect
    class="ui-gender-select"
    :model-value="modelValue"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElOption
      v-for="gender in genders"
      :key="gender.value"
      :label="gender.label"
      :value="gender.value" />
  </ElSelect>
</template>

<script>
import { User } from '@/models/User.model.js';
import { capitalize } from 'lodash';

export default {
  name: 'UiGenderSelect',
  props: {
    modelValue: String,
  },

  computed: {
    genders() {
      return Object.keys(User.enum.genders).map((key) => ({
        label: this.$t(`User.Genders.${capitalize(User.enum.genders[key])}`),
        value: User.enum.genders[key],
      }));
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
