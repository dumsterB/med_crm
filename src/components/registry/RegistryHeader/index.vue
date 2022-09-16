<template>
  <div class="registry-header">
    <PatientsSearch class="registry-header__search" />

    <LangSelect />
    <UiUserAvatarInfo :gender="user.gender" :user="user"></UiUserAvatarInfo>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LangSelect from '@/components/LangSelect/index.vue';
import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';

export default {
  name: 'RegistryHeader',
  components: { LangSelect, PatientsSearch },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
