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
      <ElFormItem :label="field.label" v-for="(field, index) of FormFields" :key="index">
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
  props: {
    data: [InspectionCardTemplate, Object],
  },
  data() {
    return {
      template: null,
      loading: false,
      FormFields: [
        {
          label: this.$t('Templates.Name'),
          name: 'title',
          type: 'textarea',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.Сomplaints'),
          type: 'textarea',
          name: 'complaints',
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.Anomnes'),
          name: 'anamnesis',
          type: 'textarea',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.Operations'),
          type: 'textarea',
          name: 'operations',
          tag: 'el-input',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          options: [
            {
              value: 'Option1',
              label: 'Option1',
            },
            {
              value: 'Option2',
              label: 'Option2',
            },
          ],
        },
        {
          label: this.$t('Templates.AnomnesLife'),
          type: 'textarea',
          required: true,
          name: 'anamnesis_life',
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
          options: [
            {
              value: 'Option1',
              label: 'Option1',
            },
            {
              value: 'Option2',
              label: 'Option2',
            },
          ],
        },
        {
          label: this.$t('Templates.GeneralState'),
          type: 'textarea',
          name: 'general_state',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.LocalStatus'),
          type: 'textarea',
          name: 'local_status',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.PreDiagnosis'),
          type: 'textarea',
          name: 'preliminary_diagnosis',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
          options: [
            {
              value: 'Option1',
              label: 'Option1',
            },
            {
              value: 'Option2',
              label: 'Option2',
            },
          ],
        },
        {
          label: this.$t('Templates.PlanObservation'),
            type: 'textarea',
          name: 'survey_plan',
          required: true,
          placeholder: this.$t('Base.WriteText'),
          tag: 'el-input',
          options: [
            {
              value: 'Option1',
              label: 'Option1',
            },
            {
              value: 'Option2',
              label: 'Option2',
            },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  watch: {
    modelValue: {
      handler() {
        this.template = new InspectionCardTemplate(
          this.data || { template_id: this.template?.id || null }
        );
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
<i18n src="@/locales/templates.locales.json" />
