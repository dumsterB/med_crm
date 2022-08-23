<template>
  <ElInput
    class="ui-phone-input"
    :model-value="phone"
    pattern="\d{9}"
    v-bind="$attrs"
    @update:model-value="updateModelValue">
    <template #prefix>
      <span class="ui-phone-prefix">{{ prefix }}</span>
    </template>
  </ElInput>
</template>

<script>
export default {
  name: 'UiPhoneInput',
  props: {
    modelValue: String,
  },
  data() {
    return {};
  },
  computed: {
    phone() {
      return this.modelValue?.replace(this.prefix, '');
    },
  },
  methods: {
    updateModelValue(value) {
      this.$emit('update:modelValue', this.prefix + value);
    },
  },

  setup: () => ({
    prefix: '+998',
  }),
};
</script>

<style lang="scss" src="./index.scss" />
