<template>
  <ElInput
    :model-value="modelValue"
    placeholder="01.01.1997"
    @update:model-value="updateModelValue">
  </ElInput>
</template>

<script>
// TODO: доделать, сейчас поддерживает только один формат DD.MM.YYYY
export default {
  name: 'UiDateInput',
  props: {
    modelValue: String,
  },

  methods: {
    updateModelValue(value) {
      const formattedValue = value
        ?.replaceAll(/\D/gm, '')
        ?.replace(/^(\d{2})(\d{0,2})(\d{0,4})/gm, (str, day, month, year) => {
          return `${day}${month ? '.' + month : ''}${year ? '.' + year : ''}`;
        })
        .slice(0, 10);

      this.$emit('update:modelValue', formattedValue);
    },
  },
};
</script>
