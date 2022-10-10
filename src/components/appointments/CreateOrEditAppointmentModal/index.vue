<template>
  <ElDialog
    custom-class="create-or-edit-appointment-modal"
    :model-value="modelValue"
    :title="$t(`Title.${data?.id ? 'Edit' : 'Create'}`)"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm
      id="create-or-edit-appointment"
      class="create-or-edit-appointment-modal-form"
      label-position="top"
      @submit.prevent="submitHandler">
      <!--  Patient  -->
      <ElCard class="create-or-edit-appointment-modal-form__patient-part" shadow="never">
        <template #header> {{ $t('Base.Patient') }} </template>
        <PatientsSearchSelectDataBlock
          v-show="!patientPart.show"
          v-model="appointment.patient_id"
          :search-query="patientsOptions.searchQuery"
          :default-item="data?.patient || patient || patientPart.newPatient"
          :disabled="!!patient || !!data?.patient_id"
          :hide-select="!!patient || !!data?.patient_id"
          :required="!patientPart.show"
          :show-create-option="permissions.createPatient"
          ref="autocomplete_patient"
          @create="startCreatePatientFlow" />

        <CreateOrEditPatient
          v-if="patientPart.show"
          class="create-or-edit-appointment-modal__create-patient"
          :name-or-phone="patientPart.nameOrPhone"
          disable-default-action
          @action="insertPatient"
          ref="create_or_edit_patient" />
      </ElCard>

      <ElCard class="create-or-edit-appointment-modal-form__add-part" shadow="never">
        <!--        <template #header> {{ $t('Appointments.Appointments') }} </template>-->
        <CreateAppointmentSubject @subject:create="addSubject" />
      </ElCard>

      <AppointmentSubjectsTable
        class="create-or-edit-appointment-modal-form__table-part"
        :items="appointment.appointments"
        @item:remove="removeSubject" />

      <ElCard class="create-or-edit-appointment-modal-form__cost-part" shadow="never">
        <ElFormItem :label="$t('Base.Discount') + ' (%)'">
          <ElInput v-model="appointment.discount" type="number" min="0" max="100" />
        </ElFormItem>
        <ElFormItem :label="$t('Base.Total')">
          {{ discountedCost }}
        </ElFormItem>
      </ElCard>
    </ElForm>

    <!--  Actions  -->
    <template #footer>
      <ElFormItem>
        <div class="create-or-edit-appointment-modal-form-actions">
          <ElButton
            type="primary"
            native-type="submit"
            form="create-or-edit-appointment"
            :loading="loading.form">
            {{ $t(`Base.${data?.id ? 'Edit' : 'Create'}`) }}
          </ElButton>
        </div>
      </ElFormItem>
    </template>
  </ElDialog>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="./index.locales.json" />
