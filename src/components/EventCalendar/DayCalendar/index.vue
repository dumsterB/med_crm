<template>
  <div class="ec-day-calendar">
    <div class="ec-day-calendar__header ec-day-calendar-header">
      <ElButton class="ec-day-calendar-header__prev" text @click="prevDay">
        <UiIcon :icon="icons.CHEVRON_LEFT" />
      </ElButton>

      <div class="ec-day-calendar-header__current-day">
        {{ dateText }}
      </div>

      <ElButton class="ec-day-calendar-header__next" text @click="nextDay">
        <UiIcon :icon="icons.CHEVRON_RIGHT" />
      </ElButton>
    </div>

    <div class="ec-day-calendar__content ec-day-calendar-content" ref="content">
      <div>
        <div class="ec-day-calendar__intervals"></div>
        <div class="ec-day-calendar-columns">
          <div class="ec-day-calendar-column" v-for="item in data" :key="item.column.id">
            <div class="ec-day-calendar-column__title">
              {{ item.column.title }}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="ec-day-calendar__intervals">
          <div
            class="ec-day-calendar__interval"
            v-for="time in times"
            :key="time"
            :style="{ height: `${hourIntervalHeight}px` }">
            {{ time }}
          </div>
        </div>
        <div class="ec-day-calendar-columns">
          <div class="ec-day-calendar-column" v-for="item in data" :key="item.column.id">
            <div
              class="ec-day-calendar__interval"
              v-for="time in times"
              :key="time"
              :style="{ height: `${hourIntervalHeight}px` }"></div>

            <EventCalendarEvent
              class="ec-day-calendar-column__event"
              v-for="event in item.data"
              :key="event.title + event.startAt"
              :event="event"
              short-time
              :style="calculateEventPositionStyles(event)"
              @click="$emit('click:event', event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCalendarEvent from '@/components/EventCalendar/Event/index.vue';
import * as icons from '@/enums/icons.enum.js';
import { prevOrNextDayByISOString } from '@/utils/dateAndTime.utils';

export default {
  name: 'DayCalendar',
  components: { EventCalendarEvent },
  emits: ['update:date', 'click:event'],
  props: {
    date: String, // ISO format

    /**
     * @param {Array<object>} dayData
     * @param {{id: number, label: string}} dayData[].column
     * @param {Array<Appointment>} dayData[].data
     */
    data: Array,
  },

  computed: {
    minuteIntervalHeight() {
      return this.hourIntervalHeight / 60;
    },

    dateText() {
      const date = new Date(this.date);
      const day = date.getDate().toString();
      const dayWeek = date.getDay().toString();

      return `${day},  ${this.$t(`DateAndTime.Days.${dayWeek}.Full`)}`;
    },
    times() {
      return Array.from(new Array(24)).map((hours, index) => `${index}:00`);
    },
    currentHour() {
      return new Date().getHours();
    },
  },
  methods: {
    calculateEventPositionStyles(event) {
      const { startAt, endAt } = event;
      const [startDate, startTime] = startAt.split(' ');
      const [endDate, endTime] = endAt.split(' ');

      const [startHours, startMinutes] = startTime.split(':');
      const [endHours, endMinutes] = endTime.split(':');

      const topPosition = this.minuteIntervalHeight * (+startHours * 60 + +startMinutes);
      const height =
        this.minuteIntervalHeight *
        (+endHours * 60 + +endMinutes - (+startHours * 60 + +startMinutes));

      return {
        // +- 1 ?????????? ???????????????????????????? ???????????????????????????? ???????????? ???????? ??????????
        top: `${topPosition + 1}px`,
        height: `${height - 1}px`,
        maxHeight: `${height - 1}px`,
      };
    },

    prevDay() {
      this.$emit('update:date', prevOrNextDayByISOString(this.date, { type: 'prev' }));
    },
    nextDay() {
      this.$emit('update:date', prevOrNextDayByISOString(this.date, { type: 'next' }));
    },
  },

  mounted() {
    this.$refs.content.scroll({
      top: this.hourIntervalHeight * this.currentHour,
    });
  },

  setup: () => ({
    icons,
    hourIntervalHeight: 180,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/dateAndTime.locales.json" />
