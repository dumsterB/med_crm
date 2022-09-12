<template>
  <div class="registry-header">
    <PatientsSearch class="registry-header__search" />
    <div class="registry-header-dropdown">
      <UserAvatarAndInfo :gender="user.gender" :user="user"></UserAvatarAndInfo>
      <LangSelect />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import LangSelect from '@/components/LangSelect/index.vue';
import PatientsSearch from '@/components/patients/PatientsSearch/index.vue';
import UserAvatarAndInfo from '@/components/ui/UserAvatarAndInfo/index.vue';
export default {
  name: 'RegistryHeader',
  components: { LangSelect, PatientsSearch, UserAvatarAndInfo },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    })
  },
  watch:{

  }
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
