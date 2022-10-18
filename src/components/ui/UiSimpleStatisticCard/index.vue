<template>
  <ElCard class="ui-simple-statistic-card" :shadow="shadow">
    <div class="ui-simple-statistic-card__icon-wrapper">
      <UiIcon class="ui-simple-statistic-card__icon" :icon="icon" />
    </div>
    <div class="ui-simple-statistic-card__label">{{ label }}</div>
    <div class="ui-simple-statistic-card__value">{{ value }}</div>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'UiSimpleStatisticCard',
  props: {
    label: [Number, String],
    value: [Number, String],
    icon: {
      type: String,
      default: icons.NOTE,
    }, // icon id from enums
    shadow: {
      type: String,
      default: 'never',
    },
  },
};
</script>
<style lang="scss" src="./index.scss" />
