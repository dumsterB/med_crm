<template>
  <ElAutocomplete
    class="ui-patients-autocomplete-search"
    :value-key="label"
    v-model="query"
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
    label: {
      // поле для показа
      type: String,
      default: 'name',
    },
    value: {
      // поле для значения
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
      handler(value) {},
      immediate: true,
    },
  },

  methods: {
    async getItems(query, cb) {
      this.$emit('update:modelValue', null);

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

  mounted() {
    if (this.defaultItem) this.query = this.defaultItem[this.label];
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
