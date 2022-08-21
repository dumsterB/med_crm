<template>
  <div class="ec-month-calendar">
    <ElCalendar v-model="dateModel" ref="calendar">
      <template #header> <div></div> </template>

      <template #dateCell="payload">
        <slot name="dateCell" :payload="payload" :day="getDay(payload.data.day)">
          <div class="ec-month-calendar-cell">
            <div class="ec-month-calendar-cell__day">
              {{ getDay(payload.data.day) }}
            </div>

            <EventCalendarEvent
              class="ec-month-calendar-cell__event"
              v-for="(item, index) in data[payload.data.day]"
              :key="item.id || index"
              :event="item" />
          </div>
        </slot>
      </template>
    </ElCalendar>
  </div>
</template>

<script>
import EventCalendarEvent from '@/components/EventCalendar/Event/index.vue';

export default {
  name: 'EventCalendarMonthCalendar',
  components: { EventCalendarEvent },
  props: {
    date: String, // ISO format,
    data: Object, // key = yyyy-mm-dd
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

  methods: {
    getDay(date) {
      return +date.split('-')[2];
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
