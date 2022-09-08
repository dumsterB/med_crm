<template>
  <ElFormItem :label="field.label" v-for="(field, index) of formFields" :key="index">
    <component
      class="create-template-drawer-form__field"
      :is="field.tag"
      :placeholder="field.placeholder"
      :model-value="data[field.name]"
      :required="field.required"
      :type="field.type"
      :rows="3"
      @update:model-value="updateField(field, $event)"
      @change="$emit('change', $event)">
      <UiRequiredHiddenInput v-if="field.options?.length" :required="field.required" />

      <ElOption
        v-if="field.options?.length"
        v-for="item in field.options"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </component>
  </ElFormItem>
</template>

<script>
import { DefaultInspectionCard } from '@/models/DefaultInspectionCard.model';

export default {
  name: 'DefaultInspectionCardBaseFormItems',
  emits: ['update:data', 'change'],
  props: {
    data: [DefaultInspectionCard, Object],
  },
  computed: {
    formFields() {
      return [
        {
          label: this.$t('Appointments.InspectionCard.Сomplaints'),
          type: 'textarea',
          name: 'complaints',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.Anomnes'),
          name: 'anamnesis',
          type: 'textarea',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.Operations'),
          type: 'textarea',
          name: 'operations',
          tag: 'ElInput',
          required: true,
          placeholder: this.$t('Base.WriteText'),
        },
        {
          label: this.$t('Appointments.InspectionCard.AnomnesLife'),
          type: 'textarea',
          required: true,
          name: 'anamnesis_life',
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.GeneralState'),
          type: 'textarea',
          name: 'general_state',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.LocalStatus'),
          type: 'textarea',
          name: 'local_status',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.PreDiagnosis'),
          type: 'textarea',
          name: 'preliminary_diagnosis',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.PlanObservation'),
          type: 'textarea',
          name: 'survey_plan',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.Recommendations'),
          type: 'textarea',
          name: 'recommendations',
          required: false,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
      ];
    },
  },

  methods: {
    updateField(field, value) {
      const isSelect = field.options?.length;

      this.$emit('update:data', { ...this.data, [field.name]: value });
      if (isSelect) this.$nextTick(() => this.$emit('change', {}));
    },
  },
};
</script>

<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/templates.locales.json" />
