<template>
  <ElInput
    class="ui-phone-input"
    :model-value="phone"
    pattern="\(\d{2}\)\s\d{3}-\d{2}-\d{2}"
    placeholder="(xx) xxx-xx-xx"
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
      const phoneExcludePrefix = this.modelValue?.replace(this.prefix, '');
      return phoneExcludePrefix?.replace(
        /^(\d{2})(\d{0,3})(\d{0,2})(\d{0,2})/gm,
        (str, code, group1, group2, group3) => {
          return `(${code}${group1 ? ') ' + group1 : ''}${group2 ? '-' + group2 : ''}${
            group3 ? '-' + group3 : ''
          }`;
        }
      );
    },
  },

  methods: {
    updateModelValue(value) {
      this.$emit('update:modelValue', this.prefix + value.replace(/[-\s()]/gm, ''));
    },
  },

  setup: () => ({
    prefix: '+998',
  }),
};
</script>

<style lang="scss" src="./index.scss" />
