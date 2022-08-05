<template>
  <ElSelect
    class="specialties-select"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElOption
      v-for="speciality in data"
      :key="speciality.id"
      :value="speciality.id"
      :label="speciality.title" />
  </ElSelect>

  <UiRequiredHiddenInput v-if="required" :model-value="modelValue" />
</template>

<script>
import { mapState } from 'vuex';
import { Specialty } from '@/models/Specialty.model';

export default {
  name: 'SpecialtiesSelect',
  props: {
    modelValue: Number,
    required: Boolean,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      /** @return {Array<Specialty>} */
      data: (state) => state.specialties.data,
      total: (state) => state.specialties.total,
    }),
  },

  methods: {
    async getSpecialties({ perPage }) {
      this.loading = true;

      const { data } = await Specialty.find({
        per_page: perPage || 999,
        page: 1,
      });
      if (data.meta.total > this.$options.constants.DefaultPerPage)
        return this.getSpecialties({ perPage: data.meta.total });

      this.$store.dispatch('specialties/setData', {
        items: data.data,
        meta: data.meta.total,
        overwriteDataState: true,
      });

      this.loading = false;
    },
  },
  mounted() {
    if (!this.total) this.getSpecialties({});
  },

  constants: { DefaultPerPage: 999 },
};
</script>

<style lang="scss" src="./index.scss" />
