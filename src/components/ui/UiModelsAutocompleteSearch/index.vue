<template>
  <ElAutocomplete
    class="ui-patients-autocomplete-search"
    v-model="query"
    :value-key="label"
    :placeholder="$t('Base.PleaseInput')"
    :fetch-suggestions="getItems"
    :debounce="250"
    :required="required"
    :disabled="disabled"
    @select="selectHandler">
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

      cb(data.data);
      this.$emit('update:data', data.data);
    },

    selectHandler(payload) {
      this.$emit('update:modelValue', payload[this.value]);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
