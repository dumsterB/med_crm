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

        <PatientCardRow
          class="default-inspection-card-form__patient"
          :patient="appointment.patient"
          :items="patientCardItems">
          <template #actions>
            <router-link :to="patientAmbulatoryCardPageLink">
              <ElButton type="primary"> {{ $t('Base.AmbulatoryCard') }} </ElButton>
            </router-link>
          </template>
        </PatientCardRow>

        <ElFormItem v-show="!readonly" :label="$t('Templates.SelectTemplate')">
          <UiModelsAutocompleteSearch
            v-model="templateId"
            label="title"
            :model-for-use="InspectionCardTemplate"
            :required="!appointment.inspection_card_id"
            :disabled="readonly"
            :default-item="activeTemplate"
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
import { mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import { insertRouteParams } from '@/utils/router.utils';
import { Appointment } from '@/models/Appointment.model';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { DefaultInspectionCard } from '@/models/DefaultInspectionCard.model';
import { PATIENT_ROUTE } from '@/router/patients.routes';

import TemplateResult from '@/components/templates/TemplateResult/index.vue';
import PatientCardRow from '@/components/patients/PatientCardRow/index.vue';

export default {
  name: 'DefaultInspectionCard',
  components: { PatientCardRow, TemplateResult },
  emits: ['update:appointment', 'appointment:provide', 'appointment:set:diagnosis'],
  props: {
    appointment: [Appointment, Object],
    readonly: Boolean,
  },
  data() {
    return {
      templateId: null,
      activeTemplate: null,
      inspectionCard: null,
    };
  },
  computed: {
    ...mapState({
      templates: (state) => state.templates.data,
    }),

    patientAmbulatoryCardPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.childrenMap.PATIENT_ROUTE_AMBULATORY_CARD._fullPath,
        params: {
          id: this.appointment.patient_id,
        },
      });
    },
    patientCardItems() {
      let servicesText = this.appointment.services.map((service) => service.title).join(',\n');

      return [
        {
          label: this.$t('Base.Services'),
          value: servicesText,
        },
        {
          label: this.$t('Appointments.StartDate'),
          value: this.appointment.start_at,
        },
      ];
    },

    isShowSetDiagnoseButton() {
      return (
        !this.readonly &&
        !!this.appointment.inspection_card &&
        !this.appointment.inspection_card?.disease_code_codes?.length
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

        if (!this.appointment.inspection_card_id && this.templates.length) {
          this.templateId = this.templates[0].id;
          this.activeTemplate = this.templates[0];
          this.selectTemplate(this.templates[0]);
        }
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
