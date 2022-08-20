<template>
  <div class="ec-day-calendar">
    <div class="ec-day-calendar__header ec-day-calendar-header">
      <ElButton class="ec-day-calendar-header__prev" text>
        <UiIcon :icon="icons.CHEVRON_LEFT" />
      </ElButton>

      <div class="ec-day-calendar__current-day">
        {{ dateText }}
      </div>

      <ElButton class="ec-day-calendar-header__next" text>
        <UiIcon :icon="icons.CHEVRON_RIGHT" />
      </ElButton>
    </div>

    <div class="ec-day-calendar__content ec-day-calendar-content"></div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'DayCalendar',
  emits: ['update:date'],
  props: {
    date: String, // ISO format
  },

  computed: {
    dateText() {
      const date = new Date(this.date);
      const day = date.getDate().toString();
      const dayWeek = date.getDay().toString();
      const month = date.getMonth().toString();

      return `${day} ${this.$t(`DateAndTime.Months.${month}.Full`)}, ${this.$t(
        `DateAndTime.Days.${dayWeek}.Full`
      )}`;
    },
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/dateAndTime.locales.json" />
