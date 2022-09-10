<template>
  <ElSelect
    :class="['ui-models-autocomplete-search', $attrs.class]"
    :model-value="modelValue"
    remote
    filterable
    reserve-keyword
    :remote-method="getItems"
    :loading="loading"
    :multiple="multiple"
    :disabled="disabled"
    :placeholder="placeholder || $t('Base.PleaseInput')"
    :no-data-text="$t('Base.NoData')"
    @visible-change="getItems"
    @update:model-value="$emit('update:modelValue', $event)"
    ref="component">
    <ElOption
      v-for="(item, index) in items"
      :key="item.id || index"
      :label="item[label]"
      :value="item[value]">
    </ElOption>

    <template #empty>
      <div class="ui-models-autocomplete-search-empty">
        <div class="ui-models-autocomplete-search-empty__text">
          {{ loading ? 'Loading' : $t('Base.NoData') }}
        </div>

        <ElButton
          v-if="showCreateOption"
          v-show="!loading"
          class="ui-models-autocomplete-search-empty__create"
          type="primary"
          text
          size="default"
          @click="createItem">
          <template #icon> <UiIcon :icon="icons.PLUS" /> </template>
          {{ $t('Base.Create') }}
        </ElButton>
      </div>
    </template>
  </ElSelect>

  <UiRequiredHiddenInput :model-value="modelValue" :required="required" />
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { CRUDModel } from '@/models/CRUD.model';

export default {
  name: 'UiModelsAutocompleteSearch',
  emits: ['update:modelValue', 'update:data', 'create'],
  slots: ['default', 'empty', 'create'],
  props: {
    modelValue: Number,
    // принимает все классы расширяющий CRUDModel
    // для поиска вызвается find метод этого класса
    modelForUse: [CRUDModel, Function],

    defaultItem: [CRUDModel, Object],
    searchQuery: Object,
    // поле для показа
    label: {
      type: String,
      default: 'name',
    },
    // поле для значения
    value: {
      type: [Number, String],
      default: 'id',
    },

    multiple: Boolean,
    required: Boolean,
    disabled: Boolean,
    placeholder: String,
    showCreateOption: Boolean,
  },
  data() {
    return {
      query: '',
      items: [],
      loading: false,
    };
  },
  watch: {
    modelValue: {
      handler(value) {
        if (!value) this.query = '';
      },
    },
    defaultItem: {
      handler() {
        if (this.defaultItem) this.query = this.defaultItem[this.label];
      },
      immediate: true,
    },
  },

  methods: {
    async getItems(query) {
      this.loading = true;

      const { data } = await this.modelForUse.find({
        page: 1,
        per_page: 100,
        query_type: 'ILIKE',
        query_field: ['name'],
        query_operator: 'OR',
        search: typeof query === 'string' ? query : '',

        ...(this.searchQuery || {}),
      });

      this.items = data.data;

      this.loading = false;
      this.$emit('update:data', data.data);
    },

    createItem() {
      return this.$emit('create', this.$refs.component.query);
    },

    focus() {
      this.$refs.component.focus();
    },
    blur() {
      this.$refs.component.blur();
    },
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
