<template>
  <ElCard class="default-inspection-card" shadow="never">
    <ElForm
      class="default-inspection-card-form"
      label-position="top"
      ref="form"
      @submit.prevent="submitHandler">
      <ElFormItem v-show="!readonly" label="select template">
        <UiModelsAutocompleteSearch
          v-model="templateId"
          label="title"
          :model-for-use="InspectionCardTemplate"
          :disabled="readonly"
          @select="selectTemplate" />
      </ElFormItem>

      <DefaultInspectionCardBaseFormItems
        v-model:data="inspectionCard"
        :readonly="readonly"
        @change="updateInspectionCard" />

      <ElFormItem>
        <div class="default-inspection-card-form-actions">
          <slot name="actions">
            <ElButton
              v-show="!readonly"
              data-method="toDiagnose"
              type="warning"
              native-type="submit"
              plain>
              {{ $t('Appointments.ToDiagnose') }}
            </ElButton>

            <ElButton
              v-show="!readonly"
              data-method="endReception"
              type="primary"
              native-type="submit">
              {{ $t('Appointments.EndReception') }}
            </ElButton>
          </slot>
        </div>
      </ElFormItem>
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
  emits: ['update:appointment', 'appointment:provide', 'appointment:set:diagnosis'],
  props: {
    appointment: [Appointment, Object],
    readonly: Boolean,
  },
  data() {
    return {
      templateId: null,
      inspectionCard: null,
    };
  },
  watch: {
    'appointment.id': {
      handler() {
        this.inspectionCard = new DefaultInspectionCard(
          this.appointment?.inspection_card || {
            user_id: this.appointment.patient_id,
            appointment_id: this.appointment.id,
          }
        );
      },
      immediate: true,
    },
  },

  methods: {
    selectTemplate(template) {
      this.inspectionCard = new DefaultInspectionCard({
        ...template,

        id: null,
        user_id: this.appointment.patient_id,
        appointment_id: this.appointment.id,
      });
      this.updateInspectionCard();
    },

    async updateInspectionCard() {
      try {
        const { data } = this.appointment.inspection_card_id
          ? await DefaultInspectionCard.update({
              id: this.appointment.inspection_card_id,
              payload: this.inspectionCard,
            })
          : await DefaultInspectionCard.create(this.inspectionCard);

        this.$emit('update:appointment', {
          ...this.appointment,
          inspection_card_id: data.data.id,
          inspection_card: data.data,
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    },

    submitHandler(event) {
      const methodName = event.submitter.dataset.method;
      this[methodName]();
    },

    toDiagnose() {
      this.$emit('appointment:set:diagnosis');
    },
    endReception() {
      this.$emit('appointment:provide');
    },
  },

  setup: () => ({
    InspectionCardTemplate,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
