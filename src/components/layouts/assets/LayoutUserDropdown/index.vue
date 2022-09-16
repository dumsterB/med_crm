<template>
  <ElPopover class="layout-user-dropdown" trigger="click" placement="bottom" width="300px">
    <template #reference>
      <UiUserAvatarInfo
        class="layout-user-dropdown__reference"
        :user="user"
        secondary-field-key="email" />
    </template>

    <div class="layout-user-dropdown__content layout-user-dropdown-content">
      <div class="layout-user-dropdown-part">
        <div class="layout-user-dropdown-part__title">{{ $t('Base.ChangeLang') }}</div>

        <LangSelect class="layout-user-dropdown-part__value" />
      </div>
    </div>
  </ElPopover>
</template>

<script>
import { mapState } from 'vuex';
import LangSelect from '@/components/LangSelect/index.vue';

export default {
  name: 'LayoutUserDropdown',
  components: { LangSelect },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
