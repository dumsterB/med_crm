<template>
  <LayoutDoctor>
    <div>
      <el-button type="primary" @click="createTemplate">Create template</el-button>
      <el-button type="primary" @click="editTemplate">Edit template</el-button>
    </div>
  </LayoutDoctor>
</template>

<script>
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';
import CreateOrEditTemplates from '@/components/doctors/CreateOrEditTemplateDrawer/index.vue';

export default {
  name: 'VTemplates',
  components: { LayoutDoctor, CreateOrEditTemplates },
  data() {
    return {
      arr: [
        {
          label: 'Название шаблона',
          field: 'fewf',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: 'Жалобы',
          type: 'textarea',
          field: 'few',
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: 'Анамнез',
          field: 'few',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: 'Операции',
          type: 'textarea',
          field: 'few',
          tag: 'el-input',
          required: true,
          placeholder: 'Выбрать шаблон',
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
          label: 'Анамнез жизни',
          type: 'textarea',
          required: true,
          field: 'few',
          placeholder: 'Выбрать шаблон',
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
          label: 'Общее состояние',
          field: 'fwe',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: 'Локальный статус',
          field: 'fweew',
          type: 'textarea',
          required: true,
          placeholder: 'Напишите текст...',
          tag: 'el-input',
        },
        {
          label: 'Предворительный диагноз',
          field: 'few',
          type: 'textarea',
          required: true,
          placeholder: 'Выбрать шаблон',
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
          label: 'План обследования',
          field: 'fwe',
          type: 'textarea',
          required: true,
          placeholder: 'Выбрать шаблон',
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
    createTemplate() {
      this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditTemplates);
    },
    editTemplate(){
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditTemplates,
        payload: {
          data: this.arr,
          status: this.EDIT
        },
      });
    }
  },
  setup:()=>({
    EDIT: 'edit'
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
