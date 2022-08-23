<template>
  <div>
    <ElInput
      class="ui-phone-input"
      :model-value="phone"
      type="number"
      :mask="{ mask: '9999 9999 9999 9999', greedy: true }"
      min="0"
      v-bind="$attrs"
      @update:model-value="updateModelValue">
      <template #prefix>
        <span class="ui-phone-prefix">{{ prefix }}</span>
      </template>
    </ElInput>
  </div>
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
    updateModelValue(value, state) {
      // На всякий случай, если изначально было без плюса
      if (state) {
        this.$emit('update:modelValue', value);
      } else {
        this.$emit('update:modelValue', this.prefix + value);
      }
    },
  },

  mounted() {
    // На всякий случай, если изначально было без плюса
    this.updateModelValue(this.modelValue, true);
  },
  setup: () => ({
    prefix: '+998',
  }),
};
</script>

<style lang="scss" src="./index.scss" />
