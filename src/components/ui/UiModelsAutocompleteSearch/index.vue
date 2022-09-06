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
      <template v-if="item.id === localEnum.NO_DATA_KEY"> {{ $t('Base.NoData') }} </template>
      <template v-else>
        {{ item[label] }}
      </template>
    </template>
  </ElAutocomplete>
</template>

<script>
import { CRUDModel } from '@/models/CRUD.model';

export default {
  name: 'UiModelsAutocompleteSearch',
  emits: ['update:modelValue', 'update:data'],
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

      cb(data.data.length ? data.data : [{ id: this.localEnum.NO_DATA_KEY, [this.label]: '' }]);
      this.$emit('update:data', data.data);
    },

    selectHandler(payload) {
      if (payload.id === this.localEnum.NO_DATA_KEY) return;

      this.$emit('update:modelValue', payload[this.value]);
    },
  },

  setup: () => ({
    localEnum: {
      NO_DATA_KEY: 'NO_DATA_KEY',
    },
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
