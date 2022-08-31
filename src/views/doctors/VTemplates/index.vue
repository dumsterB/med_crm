<template>
  <LayoutDoctor>
    <div>
      <el-button type="primary" @click="createTemplate">Drawer</el-button>
    </div>
  </LayoutDoctor>
</template>

<script>
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';
import CreateOrEditTemplates from "@/components/doctors/CreateOrEditTemplates/index.vue";

export default {
  name: 'VTemplates',
  components: { LayoutDoctor, CreateOrEditTemplates },

  methods:{
    createTemplate(){
      this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditTemplates);
    }
  }
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
