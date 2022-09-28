<template>
  <UiUserAvatarInfo :user="user" secondary-field-key="email" />
  <!--  <ElPopover class="layout-user-dropdown" trigger="click" placement="bottom" width="300px">
    <template #reference>
      <div class="layout-user-dropdown__reference layout-user-dropdown-reference">
        <UiIcon class="layout-user-dropdown-reference__icon" :icon="icons.CHEVRON_DOWN" />
      </div>
    </template>

    <div class="layout-user-dropdown__content layout-user-dropdown-content">
      <div class="layout-user-dropdown-part">
        <div class="layout-user-dropdown-part__title">{{ $t('Base.ChangeLang') }}</div>

        <LangSelect class="layout-user-dropdown-part__value" />
      </div>
    </div>
  </ElPopover>-->
</template>

<script>
import { mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import LangSelect from '@/components/LangSelect/index.vue';

export default {
  name: 'LayoutUserDropdown',
  components: { LangSelect },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
