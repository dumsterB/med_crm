<template>
  <div class="ec-event">
    <div v-show="event.startAt && event.endAt" class="ec-event__time">
      <slot name="time"> {{ time }} </slot>
    </div>

    <div v-show="event.title" class="ec-event__title">
      <slot name="title">
        {{ event.title }}
      </slot>
    </div>

    <div v-show="event.description" class="ec-event__description">
      <slot name="description">
        {{ event.description }}
      </slot>
    </div>
  </div>
</template>

<script>
import { EventCalendarEvent } from '@/components/EventCalendar/Event/EventCalendarEvent.model';
import { excludeDate } from '@/utils/dateAndTime.utils';

export default {
  name: 'EventCalendarEvent',
  props: {
    event: [EventCalendarEvent, Object],
    shortTime: Boolean, // показывать только время
  },

  computed: {
    time() {
      return this.shortTime
        ? `${excludeDate(this.event.startAt)} - ${excludeDate(this.event.endAt)}`
        : `${this.event.startAt} - ${this.event.endAt}`;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
