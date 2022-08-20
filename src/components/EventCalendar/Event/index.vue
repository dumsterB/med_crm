<template>
  <div class="ec-event">
    <div class="ec-event__title">{{ data.title }}</div>
  </div>
</template>

<script>
import { EventCalendarEvent } from '@/components/EventCalendar/Event/EventCalendarEvent.model';

export default {
  name: 'EventCalendarEvent',
  props: {
    event: [EventCalendarEvent, Object],
  },
};
</script>

<style lang="scss" src="./index.scss" />
