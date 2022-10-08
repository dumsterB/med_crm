<template>
  <ElTable :data="itemsWithPayload">
    <ElTableColumn prop="group_services" :label="$t('Base.Services')"> test </ElTableColumn>
    <ElTableColumn prop="_price" :label="$t('Base.SumCost')" />
    <ElTableColumn prop="doctor.name" :label="$t('Base.Doctor')" />
    <ElTableColumn prop="start_at" :label="$t('Appointments.StartDate')" />

    <ElTableColumn prop="actions" width="70px">
      <template #default="{ row }">
        <ElButton text size="small" @click="$emit('item:remove', row)">
          <template #icon> <UiIcon :icon="icons.CANCEL" /> </template>
        </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'AppointmentSubjectsTable',
  emits: ['item:remove'],
  props: {
    /** @type {Array<AppointmentSubject>} */
    items: Array,
  },
  computed: {
    itemsWithPayload() {
      return this.items.map((subject) => ({
        ...subject,

        _price: subject.group_services?.reduce(
          (acc, groupService) => acc + (groupService.price ?? 0),
          0
        ),
      }));
    },
  },

  setup: () => ({
    icons,
  }),
};
</script>

<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
