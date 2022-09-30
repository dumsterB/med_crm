<template>
  <div class="ui-data-list">
    <div class="ui-data-list__empty ui-data-list-empty">
      {{ $t('Base.NoData') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiDataList',
  props: {
    data: [Array],
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
