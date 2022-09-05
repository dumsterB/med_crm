<template>
  <ElDrawer
    custom-class="create-template-drawer"
    :title="$t('Templates.Create')"
    size="50%"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm @submit.prevent="submitHandler" class="create-template-drawer-form" label-position="top">
      <ElFormItem :label="field.label" v-for="(field, index) of data ? data.data : formFields" :key="index">
        <component
          :is="field.tag"
          :placeholder="field.placeholder"
          v-model="field.field"
          autosize
          :required="field.required"
          :type="field.type"
          class="create-template-drawer-form__field">

          <UiRequiredHiddenInput
            v-if="field.tag === SELECT"
            :required="field.required">
          </UiRequiredHiddenInput>

          <ElOption
            v-if="field.tag === SELECT"
            v-for="item in field.options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </component>
      </ElFormItem>

      <ElFormItem>
        <div class="create-appointment-drawer-form-actions">
          <ElButton type="primary" native-type="submit">
            {{ $t('Base.Create') }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script>
import { InspectionCardTemplate } from "@/models/InspectionCardTemplate.model";

export default {
  name: 'CreateOrEditTemplateDrawer',
  props:{
    templates: [InspectionCardTemplate, Object],
    data: [InspectionCardTemplate, Object],
  },
  data() {
    return {
      formFields: [
        {
          label: this.$t('Templates.Name'),
          field: '',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.Сomplaints'),
          type: 'textarea',
          field:'',
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.Anomnes'),
          field: '',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.Operations'),
          type: 'textarea',
          field:'',
          tag:'el-input',
          required: true,
          placeholder: this.$t('Templates.SelectTemplates'),
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
          field:'',
          placeholder: this.$t('Templates.SelectTemplates'),
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
          field: '',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.LocalStatus'),
          field: '',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: this.$t('Templates.PreDiagnosis'),
          field: '',
          type: 'textarea',
          required: true,
          placeholder: this.$t('Templates.SelectTemplates'),
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
          field: '',
          type: 'textarea',
          required: true,
          placeholder: this.$t('Templates.SelectTemplates'),
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
  methods: {
    submitHandler() {
      console.log(this.formFields);
    },
  },

  setup:()=>({
    SELECT: "ElSelect",
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/templates.locales.json" />
