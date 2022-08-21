<template>
  <component :is="component" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script>
import { mapState } from 'vuex';
import { User } from '@/models/User.model';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';
import LayoutDefault from '@/components/layouts/LayoutDefault/index.vue';

export default {
  name: 'LayoutByUserRole',
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    component() {
      if (this.user.role === User.enum.roles.Manager) return LayoutRegistry;
      if (this.user.role === User.enum.roles.Doctor) return LayoutDoctor;

      return LayoutDefault;
    },
  },
};
</script>
