<template>
  <ElCard class="default-inspection-card" shadow="never">
    <ElForm
      class="default-inspection-card-form"
      label-position="top"
      @submit.prevent="submitHandler">
      <ElFormItem label="select template">
        <UiModelsAutocompleteSearch
          v-model="templateId"
          label="title"
          :model-for-use="InspectionCardTemplate"
          @select="selectTemplate" />
      </ElFormItem>

      <DefaultInspectionCardBaseFormItems v-model:data="inspectionCard" />
    </ElForm>
  </ElCard>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { DefaultInspectionCard } from '@/models/DefaultInspectionCard.model';

import DefaultInspectionCardBaseFormItems from '@/components/appointments/DefaultInspectionCardBaseFormItems/index.vue';

export default {
  name: 'DefaultInspectionCard',
  components: { DefaultInspectionCardBaseFormItems },
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

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
