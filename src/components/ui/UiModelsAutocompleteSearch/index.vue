<template>
  <ElAutocomplete
    class="ui-models-autocomplete-search"
    v-model="query"
    :value-key="label"
    :placeholder="placeholder || $t('Base.PleaseInput')"
    :fetch-suggestions="getItems"
    :debounce="250"
    :required="required"
    :disabled="disabled"
    clearable
    @select="selectHandler">
    <template #default="{ item }">
      <slot :item="item" :query="query">
        <div v-if="item.id === localEnum.NO_DATA_KEY" class="ui-models-autocomplete-search-empty">
          <slot name="empty" :item="item" :query="query">
            {{ $t('Base.NoData') }}
          </slot>
        </div>

        <div v-if="item.id === localEnum.ACTIONS_KEY" class="ui-models-autocomplete-search-actions">
          <slot name="actions" :item="item" :query="query"> </slot>
        </div>

        <template v-else>
          {{ item[label] }}
        </template>
      </slot>
    </template>
  </ElAutocomplete>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { CRUDModel } from '@/models/CRUD.model';

export default {
  name: 'UiModelsAutocompleteSearch',
  emits: ['update:modelValue', 'update:data'],
  slots: ['default', 'empty', 'actions'],
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

    required: Boolean,
    disabled: Boolean,
    placeholder: String,
  },
  data() {
    return {
      query: '',
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
    query: {
      handler() {},
      immediate: true,
    },
  },

  methods: {
    async getItems(query, cb) {
      if (!query.length) this.$emit('update:modelValue', null);

      const { data } = await this.modelForUse.find({
        page: 1,
        per_page: 100,
        query_type: 'ILIKE',
        query_field: ['name'],
        query_operator: 'OR',
        search: query,

        ...(this.searchQuery || {}),
      });

      const options = [
        ...data.data,
        ...(!data.data.length ? [{ id: this.localEnum.NO_DATA_KEY, [this.label]: '' }] : []),
        ...(this.$slots.actions ? [{ id: this.localEnum.ACTIONS_KEY, [this.label]: '' }] : []),
      ];

      cb(options);
      this.$emit('update:data', data.data);
    },

    selectHandler(payload) {
      if (payload.id === this.localEnum.NO_DATA_KEY) return;

      this.$emit('update:modelValue', payload[this.value]);
    },
  },

  setup: () => ({
    icons,
    localEnum: {
      NO_DATA_KEY: 'NO_DATA_KEY',
      ACTIONS_KEY: 'ACTIONS_KEY',
    },
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
