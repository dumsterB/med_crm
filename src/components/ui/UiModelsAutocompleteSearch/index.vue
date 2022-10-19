<template>
  <div class="ui-models-autocomplete-search">
    <ElSelect
      :class="['ui-models-autocomplete-search__select', $attrs.class]"
      :model-value="modelValue"
      remote
      filterable
      @input="(event) => (event.target.value = onlyLatinFormatter(event.target.value))"
      reserve-keyword
      :remote-method="getItems"
      :loading="loading"
      :multiple="multiple"
      :disabled="disabled"
      :placeholder="placeholder || $t('Base.PleaseInput')"
      :clearable="clearable"
      :value-key="fieldValue"
      :no-data-text="$t('Base.NoData')"
      :collapse-tags="collapseTags"
      :collapse-tags-tooltip="collapseTagsTooltip"
      @update:model-value="$emit('update:modelValue', $event)"
      @visible-change="getItems"
      @change="selectHandler"
      ref="component">
      <ElOption
        v-for="(item, index) in items"
        :key="item.id || index"
        :label="item[label]"
        :value="item[value]">
        <slot :item="item" :label="item[label]" :value="item[value]"></slot>
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
            size="default"
            @click="createItem">
            <template #icon> <UiIcon :icon="icons.PLUS" /> </template>
            {{ $t('Base.Create') }}
          </ElButton>
        </div>
      </template>
    </ElSelect>

    <UiRequiredHiddenInput :model-value="modelValue" :required="required" />
  </div>
</template>

<script>
import { onlyLatinFormatter } from '@/utils/formatters.util';
import * as icons from '@/enums/icons.enum.js';
import { CRUDModel } from '@/models/CRUD.model';
import { cloneDeep } from 'lodash';

export default {
  name: 'UiModelsAutocompleteSearch',
  emits: ['update:modelValue', 'update:data', 'create', 'select'],
  slots: ['default', 'empty', 'create'],
  props: {
    modelValue: [Number, String, Boolean, Array],
    // принимает все классы расширяющий CRUDModel
    // для поиска вызвается find метод этого класса
    modelForUse: [CRUDModel, Function],

    defaultItem: [CRUDModel, Object, Array],
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

    showCreateOption: Boolean,
    multiple: Boolean,
    required: Boolean,
    disabled: Boolean,
    placeholder: String,
    clearable: Boolean,
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
  },
  data() {
    return {
      query: '',
      items: [],
      loading: false,
      fieldValue: '',
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
        if (this.defaultItem)
          this.items = this.defaultItem instanceof Array ? this.defaultItem : [this.defaultItem];
      },
      immediate: true,
    },
  },

  methods: {
    valueHandler(event) {
      return (event.target.value = onlyLatinFormatter());
    },
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

    selectHandler(idOrIds) {
      const result = this.multiple
        ? this.items.filter((elem) => idOrIds.includes(elem[this.value]))
        : this.items.find((elem) => elem[this.value] === idOrIds);

      this.$emit('select', cloneDeep(result));
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
    onlyLatinFormatter,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
