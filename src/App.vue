<script>
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';

export default {
  name: 'App',
  components: { RouterView, ElConfigProvider },
};
</script>

<template>
  <ElConfigProvider>
    <RouterView />
  </ElConfigProvider>
</template>

<style src="./App.scss" lang="scss"></style>
