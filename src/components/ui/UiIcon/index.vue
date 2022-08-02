<template>
  <span class="ui-icon">
    <svg class="ui-icon__content">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'UiIcon',
  props: {
    icon: String, // id символов из SVG
  },
};
</script>

<style lang="scss" src="./index.scss" />
