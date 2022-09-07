<template>
  <ElCard shadow="never">
    <ElForm label-position="top" @submit.prevent="submitHandler">
      <ElFormItem label="select template">
        <UiModelsAutocompleteSearch
          v-model="templateId"
          label="title"
          :model-for-use="InspectionCardTemplate"
          @select="selectTemplate" />
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { DefaultInspectionCard } from '@/models/DefaultInspectionCard.model';

export default {
  name: 'DefaultInspectionCard',
  props: {
    appointment: [Appointment, Object],
  },
  data() {
    return {
      templateId: null,
      inspectionCard: null,
    };
  },
  watch: {
    'appointment.id': {
      handler(value) {
        if (!value) return;

        this.inspectionCard = new DefaultInspectionCard(this.appointment.inspection_card || {});
      },
      immediate: true,
    },
  },

  methods: {
    submitHandler() {
      console.log('submit');
    },
    selectTemplate(template) {
      this.inspectionCard = new DefaultInspectionCard({ ...template, id: null });
    },
  },

  setup: () => ({
    InspectionCardTemplate,
  }),
};
</script>
