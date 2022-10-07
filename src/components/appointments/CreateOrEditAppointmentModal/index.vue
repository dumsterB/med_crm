<template>
  <ElDialog
    custom-class="create-appointment-modal"
    :model-value="modelValue"
    :title="$t(`Title.${data?.id ? 'Edit' : 'Create'}`)"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm
      class="create-appointment-modal-form"
      label-position="top"
      @submit.prevent="submitHandler">
      <!--  Patient  -->
      <ElFormItem
        :label="$t('Base.Patient')"
        :style="{ order: this.appointmentFieldsFlexOrder.patient }">
        <PatientsSearchSelect
          v-model="appointment.patient_id"
          :search-query="patientsOptions.searchQuery"
          :default-item="data?.patient || patient || patientModal.newPatient"
          :disabled="!!patient || !!data"
          :placeholder="$t('User.PleaseInputNameOrPhone')"
          required
          :show-create-option="permissions.createPatient"
          ref="autocomplete_patient"
          @create="openCreatePatientModal" />
      </ElFormItem>

      <!--  Type  -->
      <ElFormItem
        v-show="!data?.id"
        :label="$t('SelectType')"
        :style="{ order: this.appointmentFieldsFlexOrder.type }">
        <ElRadioGroup v-model="appointmentType">
          <ElRadio :label="appointmentTypesEnum.Doctor">
            {{ $t(`Appointments.Types.${appointmentTypesEnum.Doctor}`) }}
          </ElRadio>
          <ElRadio :label="appointmentTypesEnum.Service">
            {{ $t(`Appointments.Types.${appointmentTypesEnum.Service}`) }}
          </ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <!--  Specialty  -->
      <!--      <ElFormItem
        v-show="specialtiesOptions.isShow"
        :label="$t('SelectSpecialty')"
        :style="{ order: this.appointmentFieldsFlexOrder.specialty }">
        <SpecialtiesSelect
          v-model="appointment.specialty_id"
          :disabled="specialtiesOptions.isDisabled"
          :required="specialtiesOptions.isRequired" />
      </ElFormItem>-->

      <!--  GroupService  -->
      <ElFormItem
        v-show="groupServicesOptions.isShow"
        :label="$t('SelectService')"
        :style="{ order: this.appointmentFieldsFlexOrder.groupService }">
        <UiModelsAutocompleteSearch
          v-model="appointment.group_service_ids"
          label="title"
          :modelForUse="ServiceGroup"
          :searchQuery="groupServicesOptions.searchQuery"
          :disabled="groupServicesOptions.isDisabled"
          :required="groupServicesOptions.isRequired"
          multiple
          @update:data="groupServices = $event">
          <template #default="{ item }"> {{ generateServiceOptionLabel(item) }} </template>
        </UiModelsAutocompleteSearch>
      </ElFormItem>

      <!--  Doctor and Service when has GroupService  -->
      <ElFormItem
        v-show="doctorsAndServicesOptions.isShow"
        :label="$t('SelectDoctor')"
        :style="{ order: this.appointmentFieldsFlexOrder.doctor }">
        <DoctorsSelectByGroupService
          v-model:appointment="appointment"
          :service-group="currentGroupService"
          :required="doctorsAndServicesOptions.isRequired" />
      </ElFormItem>

      <!--  Doctor  -->
      <ElFormItem
        v-show="doctorsOptions.isShow"
        :label="$t('SelectDoctor')"
        :style="{ order: this.appointmentFieldsFlexOrder.doctor }">
        <UiModelsAutocompleteSearch
          v-model="appointment.doctor_id"
          :modelForUse="Doctor"
          :defaultItem="data?.doctor || user?.doctor"
          :searchQuery="doctorsOptions.searchQuery"
          :disabled="doctorsOptions.isDisabled"
          :required="doctorsOptions.isRequired" />
      </ElFormItem>

      <!--  Service  -->
      <ElFormItem
        v-show="servicesOptions.isShow"
        :label="$t('SelectService')"
        :style="{ order: this.appointmentFieldsFlexOrder.service }">
        <UiModelsAutocompleteSearch
          v-model="appointment.service_ids"
          label="title"
          :defaultItem="data?.services"
          :modelForUse="Service"
          :searchQuery="servicesOptions.searchQuery"
          :disabled="servicesOptions.isDisabled"
          :required="servicesOptions.isRequired"
          multiple>
          <template #default="{ item }"> {{ generateServiceOptionLabel(item) }} </template>
        </UiModelsAutocompleteSearch>
      </ElFormItem>

      <!--  Select Date type  -->
      <ElFormItem
        v-show="dateTypeOptions.isShow"
        :style="{ order: this.appointmentFieldsFlexOrder.dateType }">
        <ElRadioGroup v-model="isLiveQueue">
          <ElRadio :label="true"> {{ $t('Appointments.LiveQueue') }} </ElRadio>
          <ElRadio :label="false"> {{ $t('Appointments.RecordOnTime') }} </ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <!--  Date  -->
      <ElFormItem
        v-show="slotsOptions.isShow"
        :label="$t('DateAndTime.SelectDate')"
        :style="{ order: this.appointmentFieldsFlexOrder.date }">
        <ScheduleSlotsSelect
          v-model:start-at="appointment.start_at"
          v-model:end-at="appointment.end_at"
          :default-start-at="data?.start_at"
          :default-end-at="data?.end_at"
          :disabled="slotsOptions.isDisabled"
          :service-ids="appointment.service_ids"
          :group-service-id="appointment.group_service_id"
          :dependencies="slotsOptions.dependencies" />
      </ElFormItem>
      <!--  Actions  -->
      <ElFormItem :style="{ order: this.appointmentFieldsFlexOrder.actions }">
        <div class="create-appointment-modal-form-actions">
          <ElButton type="primary" native-type="submit" :loading="loading.form">
            {{ $t(`Base.${data?.id ? 'Edit' : 'Create'}`) }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>

    <CreateOrEditPatientModal
      v-model="patientModal.show"
      :name-or-phone="patientModal.nameOrPhone"
      disable-default-action
      @action="insertPatient" />
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
