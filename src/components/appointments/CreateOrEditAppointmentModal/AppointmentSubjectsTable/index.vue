<template>
  <ElTable :data="itemsWithPayload">
    <ElTableColumn prop="_title" :label="$t('Base.Services')" />
    <ElTableColumn prop="_price" :label="$t('Base.SumCost')" width="110px" />
    <ElTableColumn prop="doctor.name" :label="$t('Base.Doctor')" />
    <ElTableColumn prop="start_at" :label="$t('Appointments.StartDate')" width="150px" />

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
import { formatPrice } from '@/utils/price.util';

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

        _title: subject.group_services?.map((elem) => elem.title)?.join(', \r\n'),
        _price: formatPrice({
          price: subject.group_services?.reduce(
            (acc, groupService) => acc + (groupService.price ?? 0),
            0
          ),
        }),
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
