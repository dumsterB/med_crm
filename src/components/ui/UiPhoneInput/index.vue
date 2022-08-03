<template>
  <ElInput
    class="ui-phone-input"
    :model-value="phone"
    type="number"
    min="0"
    v-bind="$attrs"
    @update:model-value="updateModelValue">
    <template #prefix> + </template>
  </ElInput>
</template>

<script>
export default {
  name: 'UiPhoneInput',
  props: {
    modelValue: String,
  },
  computed: {
    phone() {
      return this.modelValue?.replace(/^\+*/, '');
    },
  },
  methods: {
    updateModelValue(value) {
      this.$emit('update:modelValue', `+${value || ''}`.replace(/^\+*/, '+'));
    },
  },

  mounted() {
    // На всякий случай, если изначально было без плюса
    this.updateModelValue(this.modelValue);
  },
};
</script>

<style lang="scss" src="./index.scss" />
