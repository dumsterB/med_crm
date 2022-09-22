<template>
  <ElInput
    class="ui-required-hidden-input"
    :model-value="modelValue"
    :required="required"
    v-bind="$attrs" />
</template>

<script>
export default {
  name: 'UiRequiredHiddenInput',
  props: {
    modelValue: [Number, String, Boolean, Array],
    required: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
