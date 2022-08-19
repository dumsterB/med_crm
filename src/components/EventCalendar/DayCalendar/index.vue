<template>
  <div class="ec-day-calendar">
    <div class="ec-day-calendar__header ec-day-calendar-header">
      <div class="ec-day-calendar-header__prev">prev</div>

      <div class="ec-day-calendar__current-day">
        {{}}
      </div>

      <div class="ec-day-calendar-header__next">next</div>
    </div>

    <div class="ec-day-calendar__content ec-day-calendar-content"></div>
  </div>
</template>

<script>
export default {
  name: 'DayCalendar',
  emits: ['update:date'],
  props: {
    date: String, // ISO format
  },
};
</script>

<style lang="scss" src="./index.scss" />
