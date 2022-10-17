<template>
  <div class="patients-search-select-data-block">
    <PatientsSearchSelect
      v-show="!hideSelect"
      class="patients-search-select-data-block__search"
      :placeholder="$t('User.PleaseInputNameOrPhone')"
      :model-value="modelValue"
      :search-query="query"
      :required="required"
      :disabled="disabled"
      :default-item="defaultItem"
      :show-create-option="showCreateOption"
      ref="select"
      @update:model-value="$emit('update:modelValue', $event)"
      @select="selectHandler"
      @create="$emit('create', $event)" />

    <div class="patients-search-select-data-block__content">
      <ElFormItem :label="$t('User.FullName')">
        {{ patient?.name || '....' }}
      </ElFormItem>

      <ElFormItem :label="$t('User.Phone')">
        {{ patient?.phone || '....' }}
      </ElFormItem>

      <ElFormItem :label="$t('User.Gender')">
        {{ patient?.gender ? $t(`User.Genders.${patient.gender}`) : '...' }}
      </ElFormItem>

      <slot name="content-append"> </slot>
    </div>
  </div>
</template>

<script>
import { Patient } from '@/models/Patient.model';
import PatientsSearchSelect from '@/components/patients/PatientsSearchSelect/index.vue';

export default {
  name: 'PatientsSearchSelectDataBlock',
  components: { PatientsSearchSelect },
  emits: ['update:modelValue', 'select', 'create'],
  props: {
    modelValue: Number,
    defaultItem: [Patient, Object],
    required: Boolean,
    disabled: Boolean,
    searchQuery: Object,
    showCreateOption: Boolean,
    hideSelect: Boolean,
  },
  data() {
    return {
      patient: null,
    };
  },
  computed: {
    query() {
      return {
        query_field: ['name', 'phone'],
        ...(this.searchQuery ?? {}),
      };
    },
  },

  watch: {
    defaultItem: {
      handler(value) {
        this.patient = value;
      },
      immediate: true,
    },
  },

  methods: {
    selectHandler(data) {
      this.patient = data;
      this.$emit('select', data);
    },

    focus() {
      this.$refs.select.focus();
    },
    blur() {
      this.$refs.select.blur();
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
