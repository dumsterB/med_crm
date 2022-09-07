<template>
  <LayoutByUserRole content-class="v-not-found-content">
    <div class="v-not-found-content__image v-not-found-content-image">
      <slot name="image"> 404 </slot>
    </div>

    <div class="v-not-found-content__title v-not-found-content-title">
      <slot name="title"> {{ title || $t('Title') }} </slot>
    </div>

    <div class="v-not-found-content__action v-not-found-content-action">
      <slot name="action">
        <RouterLink to="/">
          <ElButton type="primary"> {{ $t('Home') }} </ElButton>
        </RouterLink>
      </slot>
    </div>
  </LayoutByUserRole>
</template>

<script>
import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';

export default {
  name: 'VNotFound',
  props: {
    title: String,
  },
  components: { LayoutByUserRole },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
