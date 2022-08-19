<template>
  <div class="ec-month-calendar">
    <ElCalendar v-model="dateModel" ref="calendar"></ElCalendar>
  </div>
</template>

<script>
export default {
  name: 'EventCalendarMonthCalendar',
  props: {
    date: String, // ISO format
  },
  computed: {
    dateModel: {
      get() {
        return new Date(this.date);
      },
      set(value) {
        this.$emit('update:date', value.toISOString());
      },
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
