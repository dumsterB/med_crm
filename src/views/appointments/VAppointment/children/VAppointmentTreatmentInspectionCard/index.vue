<template>
  <div class="v-app-treat-card">
    <LayoutContentHeader>
      <ElPageHeader
        class="v-app-treat-treat-card-header"
        :title="$t('Base.Back')"
        @back="goToAppointment">
        <template #content>
          <div class="v-app-treat-card-header-info">
            <span> {{ $t('Title') }} </span>

            <RouterLink :to="patientPageLink">
              <ElButton type="primary" text> {{ appointment.patient.name }} </ElButton>
            </RouterLink>
          </div>
        </template>
      </ElPageHeader>
    </LayoutContentHeader>

    <ElCard shadow="never">
      <ElForm class="v-app-treat-card-form" label-position="top" @submit.prevent="submitHandler">
        <ElFormItem :label="$t('Appointments.InspectionCard.Сomplaints')">
          <ElInput
            v-model="inspectionCard.complaints"
            type="textarea"
            :placeholder="$t('Base.PleaseInput')"
            :rows="3"
            required
            :readonly="isProvided"
            @change="updateInspectionCard" />
        </ElFormItem>

        <ElFormItem :label="$t('Appointments.InspectionCard.GeneralState')">
          <ElInput
            v-model="inspectionCard.general_state"
            type="textarea"
            :placeholder="$t('Base.PleaseInput')"
            :rows="3"
            required
            :readonly="isProvided"
            @change="updateInspectionCard" />
        </ElFormItem>

        <div v-show="!isProvided" class="v-app-treat-card-form-actions">
          <ElButton
            data-method="closeTreatment"
            type="warning"
            plain
            native-type="submit"
            :loading="loading.closeTreatment">
            {{ $t('Treatments.CloseTreatment') }}
          </ElButton>

          <ElButton data-method="endReception" type="primary" native-type="submit">
            {{ $t('Appointments.EndReception') }}
          </ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>

<script>
import { insertRouteParams } from '@/utils/router.utils';
import { Appointment } from '@/models/Appointment.model';
import { TreatmentInspectionCard } from '@/models/TreatmentInspectionCard.model';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { PATIENT_ROUTE } from '@/router/patients.routes';

import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import { Treatment } from '@/models/Treatment.model';

export default {
  name: 'VAppointmentTreatmentInspectionCard',
  components: { LayoutContentHeader },
  emits: ['update:appointment', 'appointment:provide'],
  props: {
    appointment: [Appointment, Object],
  },
  data() {
    return {
      /** @type {TreatmentInspectionCard} */
      inspectionCard: null,

      loading: {
        closeTreatment: false,
      },
    };
  },
  computed: {
    isProvided() {
      return this.appointment.status === Appointment.enum.statuses.Provided;
    },
    patientPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
        params: { id: this.appointment.patient_id },
      });
    },
  },
  watch: {
    'appointment.id': {
      handler() {
        this.inspectionCard = new TreatmentInspectionCard(
          this.appointment.inspection_card || {
            user_id: this.appointment.patient_id,
            appointment_id: this.appointment.id,
          }
        );
      },
      immediate: true,
    },

    'appointment.status': {
      handler(value) {
        if (
          (value &&
            ![Appointment.enum.statuses.InProgress, Appointment.enum.statuses.Provided].includes(
              value
            )) ||
          this.appointment.service_case_id
        )
          return this.goToAppointment();
      },
      immediate: true,
    },
  },

  methods: {
    goToAppointment() {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: this.appointment.id,
        },
      });
    },

    async updateInspectionCard() {
      try {
        const { data } = this.appointment.inspection_card_id
          ? await TreatmentInspectionCard.update({
              id: this.appointment.inspection_card_id,
              payload: this.inspectionCard,
            })
          : await TreatmentInspectionCard.create(this.inspectionCard);

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

    async closeTreatment() {
      this.loading.closeTreatment = true;

      try {
        const { data } = await Treatment.close(this.appointment.treatment_id);
        this.$emit('update:appointment', {
          ...this.appointment,
          treatment: data.data,
        });

        this.endReception();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notification.Error'),
        });
      }

      this.loading.closeTreatment = false;
    },
    endReception() {
      this.$emit('appointment:provide');
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/treatments.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
