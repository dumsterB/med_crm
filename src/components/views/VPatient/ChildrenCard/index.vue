<template>
  <div
      class="v-patients-content-card"
      v-for="child of data"
      :key="child.id">
    <ElRow>
      <ElCol :span="8">
        <div class="v-patients-content-card__item">
          <UiAvatar size="super-large" />
          <div class="v-patients-content-card__item__children">
            <div>
              <ElTag class="v-patients-content-card__item__children__button">
                {{ $t('ChildrenText') }}
              </ElTag>
            </div>
            <div class="v-patients-content-card__item__children__name">
              {{ child.name }}
            </div>
            <div class="v-patients-content-card__item__children__birthdate">
              {{ child.birthdate }}
            </div>
          </div>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="v-patients-content-card__item">
          <div class="v-patients-content-card__item__children">
            <div class="v-patients-content-card__item__children__parent-label">
              {{ $t('Parents') }}
            </div>
            <div class="v-patients-content-card__item__children__parent">
              {{ parentName }}
              <UiIcon
                  class="v-patients-content-card__item__children__icon"
                  :icon="$options.icons.TRASH" />
            </div>
            <br />
            <div class="v-patients-content-card__item__children__gender-label">
              {{ $t('Gender') }}
            </div>
            <div class="v-patients-content-card__item__children__gender">
              Мужской {{ child.gender }}
            </div>
          </div>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div class="v-patients-content-card__item last__item ">
          <div class="v-patients-content-card__item__actions">
            <div>
              <ElTag class="v-patients-content-card__item__actions__create">
                <UiIcon :icon="$options.icons.PLUS" /> {{ $t('AddRecord') }}
              </ElTag>
            </div>
            <div>
              <ElTag class="v-patients-content-card__item__actions__edit">
                {{ $t('Base.Edit') }}
              </ElTag>
            </div>
            <div>
              <ElTag class="v-patients-content-card__item__actions__delete">
                {{ $t('Base.Delete') }}
              </ElTag>
            </div>
          </div>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script>
import * as icons from "@/enums/icons.enum";
export default {
  name: "index",
  props:{
    data: {
      type: Array,
      required: true,
      default: [],
    },
    parentName: {
      type: String,
      required: true,
      default: ''
    }
  },
  icons: icons,
}
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />