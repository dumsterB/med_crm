<template>
  <div class="ec-event">
    <div class="ec-event__title">{{ data.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'EventCalendarEvent',
  props: {
    /**
     * @property {object} data
     * @property {string} data.title
     */
    data: Object,
  },
};
</script>

<style lang="scss" src="./index.scss" />
