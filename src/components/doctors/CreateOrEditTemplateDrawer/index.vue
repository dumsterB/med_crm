<template>
  <ElDrawer
    custom-class="create-or-edit-template-drawer"
    :title="data?.id ? $t('Templates.Edit') : $t('Templates.Create')"
    size="50%"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm
      @submit.prevent="submitHandler"
      class="create-template-drawer-form"
      label-position="top">
      <ElFormItem :label="field.label" v-for="(field, index) of formFields" :key="index">
        <component
          :is="field.tag"
          :placeholder="field.placeholder"
          v-model="template[field.name]"
          autosize
          :required="field.required"
          :type="field.type"
          class="create-template-drawer-form__field">
          <UiRequiredHiddenInput v-if="field.options?.length" :required="field.required">
          </UiRequiredHiddenInput>

          <ElOption
            v-if="field.options?.length"
            v-for="item in field.options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </component>
      </ElFormItem>

      <ElFormItem>
        <div class="create-appointment-drawer-form-actions">
          <ElButton type="primary" native-type="submit">
            {{ data?.id ? $t('Base.Edit') : $t('Base.Create') }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script>
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { mapState } from 'vuex';
import { GlobalDrawerAction } from '@/models/client/ModalAndDrawer/GlobalDrawerAction';

export default {
  name: 'CreateOrEditTemplateDrawer',
  emits: ['update:modelValue', 'action'],
  props: {
    data: [InspectionCardTemplate, Object],
  },
  data() {
    return {
      template: null,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    formFields() {
      return [
        {
          label: this.$t('Templates.Name'),
          name: 'title',
          type: 'textarea',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'ElInput',
        },
        {
          label: this.$t('Appointments.InspectionCard.Сomplaints'),
          type: 'textarea',
          name: 'complaints',
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

  watch: {
    modelValue: {
      handler() {
        this.template = new InspectionCardTemplate(this.data || {});
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async submitHandler() {
      this.loading = true;

      try {
        this.data?.id ? await this.editTemplate() : await this.createTemplate();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading = false;
    },

    async createTemplate() {
      const { data } = await InspectionCardTemplate.create({
        ...this.template,
        doctor: this.user.doctor,
      });
      this.$store.dispatch('templates/createItem', data.data);
      this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessCreated') });

      this.$emit(
        'action',
        new GlobalDrawerAction({ name: 'created', data: { template: data.data } })
      );
    },

    async editTemplate() {
      const { data } = await InspectionCardTemplate.update(this.template, this.data.id);
      this.$store.dispatch('templates/editItem', data.data);
      this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });

      this.$emit('action', new GlobalDrawerAction({ name: 'created', data: { template: data } }));
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/templates.locales.json" />
