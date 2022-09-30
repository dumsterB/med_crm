<template>
  <div class="patients-table-wrapper">
    <ElScrollbar class="patients-table-wrapper__scrollbar">
      <ElTable
        class="patients-table"
        :data="items"
        v-loading="loading"
        ref="elTable"
        @row-click="goToPatient">
        <template #empty>
          <div class="patients-table__empty patients-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton v-if="!isDoctor" type="primary" @click="addPatient">
              {{ $t('Patients.AddPatient') }}
            </ElButton>
          </div>
        </template>

        <ElTableColumn prop="name" :label="$t('User.FullName')" width="300px">
          <template #default="{ row }">
            <UiUserAvatarInfo class="patients-table__user" :user="row" show-has-treatment />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="gender" :label="$t('User.Gender')">
          <template #default="{ row }">
            {{ row.gender ? $t(`User.Genders.${row.gender}`) : '' }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="birthdate" :label="$t('User.Birthdate')"></ElTableColumn>
        <ElTableColumn prop="phone" :label="$t('User.Phone')"></ElTableColumn>
        <ElTableColumn prop="childrens_count" :label="$t('User.Children')">
          <template #default="{ row }">
            <template v-if="!row.parent_id">
              <span v-show="!!row.childrens_count"> {{ row.childrens_count }} </span>
              <ElButton
                v-show="!row.childrens_count"
                type="primary"
                plain
                @click.stop="addChildren(row)">
                <UiIcon :icon="$options.icons.PLUS" />
              </ElButton>
            </template>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="patients-table-actions">
              <ElButton type="primary" @click.stop="makeAppointment(row)">
                {{ $t('Base.MakeAppointment') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>

    <ElPagination
      class="patients-table-wrapper__pagination"
      :current-page="page"
      :page-count="pageCount"
      :page-size="perPage"
      :page-sizes="pageSizes"
      :total="total"
      background
      hide-on-single-page
      layout="prev, pager, next, sizes"
      @update:current-page="$emit('update:page', $event)"
      @update:page-size="$emit('update:perPage', $event)" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';

import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';

export default {
  name: 'PatientsTable',
  emits: ['update:perPage', 'update:page'],
  props: {
    loading: Boolean,
    /**
     * @property { Array<Patient|object> } items
     */
    items: Array,
    page: Number,
    perPage: Number,
    total: Number,
    search: String,
  },
  icons: icons,
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    hasItems() {
      return !!this.items.length;
    },
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
    pageSizes() {
      return PAGE_SIZES;
    },
  },
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

  methods: {
    goToPatient(payload) {
      this.$router.push({
        name: PATIENT_ROUTE.name,
        params: { id: payload.id },
      });
    },

    isDoctor() {
      return this.user.role === User.enum.roles.Doctor;
    },

    makeAppointment(payload) {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          patient: payload,
        },
      });
    },
    addPatient() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: {
          nameOrPhone: this.search,
        },
      });
    },

    addChildren(payload) {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: {
          data: new Patient({ parent: payload, parent_id: payload.id }),
        },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
