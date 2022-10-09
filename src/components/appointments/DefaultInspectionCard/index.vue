<template>
  <ElCard class="default-inspection-card printer__block printer__doc" shadow="never">
    <ElForm
      class="default-inspection-card-form"
      label-position="top"
      id="inspection-card"
      ref="form"
      @submit.prevent="submitHandler">
      <div class="default-inspection-card-form__content">
        <h1 class="printer__title default-inspection-card-form__title">
          {{ $t('Base.InspectionCard') }}
        </h1>

        <ElFormItem v-show="!readonly" :label="$t('Templates.SelectTemplate')">
          <UiModelsAutocompleteSearch
            v-model="templateId"
            label="title"
            :model-for-use="InspectionCardTemplate"
            :disabled="readonly"
            @select="selectTemplate" />
        </ElFormItem>

        <TemplateResult
          class="default-inspection-card-form__template-result"
          v-model="inspectionCard.basic_data"
          :readonly="readonly"
          @change="updateInspectionCard" />
      </div>

      <ElFormItem class="default-inspection-card-form__actions">
        <div class="default-inspection-card-form-actions">
          <slot name="actions">
            <ElButton v-show="isShowSetDiagnoseButton" type="warning" plain @click="toDiagnose">
              {{ $t('Appointments.ToDiagnose') }}
            </ElButton>

            <ElButton v-show="!readonly" type="primary" native-type="submit">
              {{ $t('Appointments.EndReception') }}
            </ElButton>

            <ElButton v-show="readonly" text @click="print">
              <template #icon>
                <UiIcon :icon="icons.PRINTER" />
              </template>
              {{ $t('Base.Print') }}
            </ElButton>
          </slot>
        </div>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Appointment } from '@/models/Appointment.model';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { DefaultInspectionCard } from '@/models/DefaultInspectionCard.model';
import TemplateResult from '@/components/templates/TemplateResult/index.vue';

export default {
  name: 'DefaultInspectionCard',
  components: { TemplateResult },
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
  computed: {
    isShowSetDiagnoseButton() {
      return (
        (!this.readonly &&
          !!this.appointment.inspection_card &&
          !this.appointment.inspection_card?.disease_code_codes?.length) ||
        true
      );
    },
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
    print() {
      window.print();
    },
    /** @param {InspectionCardTemplate} template */
    selectTemplate(template) {
      this.inspectionCard = new DefaultInspectionCard({
        id: null,
        user_id: this.appointment.patient_id,
        appointment_id: this.appointment.id,

        basic_data: template.basic_data,
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

    submitHandler() {
      this.endReception();
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
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/templates.locales.json" />
<i18n src="./index.locales.json" />
