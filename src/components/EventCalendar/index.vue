<template>
  <div :class="['event-calendar', `event-calendar_${type}`]">
    <div class="event-calendar__header event-calendar-header">
      <div class="event-calendar-header-picker">
        <ElButton text class="event-calendar-header-picker__prev" @click="prevMonth">
          <UiIcon :icon="icons.CHEVRON_LEFT" />
        </ElButton>

        <label class="event-calendar-hidden-picker-label">
          <span class="event-calendar-hidden-picker-label__title">
            {{ $t(`DateAndTime.Months.${month}.Full`) }}
          </span>
          <ElDatePicker
            :model-value="date"
            type="month"
            @update:model-value="$emit('update:date', $event)" />
        </label>

        <ElButton text class="event-calendar-header-picker__next" @click="nextMonth">
          <UiIcon :icon="icons.CHEVRON_RIGHT" />
        </ElButton>
      </div>

      <div class="event-calendar-header-actions">
        <slot name="actions"></slot>
        <ElSelect
          class="event-calendar__type-select"
          :model-value="type"
          @update:model-value="$emit('update:type', $event)">
          <ElOption v-for="type in types" :key="type" :label="$t(`Types.${type}`)" :value="type" />
        </ElSelect>
      </div>
    </div>

    <div class="event-calendar__content event-calendar-content" v-loading="loading">
      <MonthCalendar
        v-if="type === EVENT_CALENDAR_TYPES.MONTH"
        :date="date"
        :data="monthData"
        @update:date="setDayTypeAndDate" />
      <DayCalendar v-if="type === EVENT_CALENDAR_TYPES.DAY" v-model:date="date" />
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="./index.locales.json" />
