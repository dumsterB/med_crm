<template>
  <ElDialog
    custom-class="create-or-pay-invoice-modal"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <template #header>
      <div v-if="invoice.id" class="create-or-pay-invoice-modal-header">
        <div>{{ $t('Base.Invoice') }}:</div>
        <div>#{{ data?.id }}</div>
        <InvoiceStatusTag
          class="create-or-pay-invoice-modal-header__status"
          :status="data.status" />
      </div>

      <div v-if="!invoice.id" class="create-or-pay-invoice-modal__header">
        {{ $t('Invoices.Create') }}
      </div>
    </template>

    <ElForm
      id="create-or-pay-invoice"
      class="create-or-pay-invoice-modal__content create-or-pay-invoice-modal-content"
      @submit.prevent="submitHandler">
      <!--  TODO: вынести в отдельный компоент, будет использоваться и при создании записи  -->
      <!--  Patient  -->
      <ElCard
        class="create-or-pay-invoice-modal-part"
        shadow="never"
        :style="{ gridRow: !invoice.id ? 'auto' : '1/3' }">
        <template #header> {{ $t('PatientInfo') }} </template>

        <PatientsSearchSelect
          v-if="!invoice.id"
          class="create-or-pay-invoice-modal-part-search"
          v-model="invoice.user_id"
          required
          :default-item="invoice.user"
          :disabled="!!invoice.id"
          @select="invoice.user = $event" />

        <div class="create-or-pay-invoice-modal-part-content">
          <ElFormItem :label="$t('User.FullName')">
            {{ invoice.user?.name || '....' }}
          </ElFormItem>

          <ElFormItem :label="$t('User.Phone')">
            {{ invoice.user?.phone || '....' }}
          </ElFormItem>

          <ElFormItem class="create-or-pay-invoice-modal-notes-part" :label="$t('Base.Notes')">
            <ElInput
              v-model="invoice.description"
              type="textarea"
              :rows="3"
              :disabled="!!invoice.id" />
          </ElFormItem>

          <ElFormItem v-if="!!invoice.id" :label="$t('DateAndTime.CreatedAt')">
            {{ invoice.created_at }}
          </ElFormItem>
        </div>
      </ElCard>

      <!--  TODO: вынести в отдельный компоент, будет использоваться и при создании записи  -->
      <!--  Services  -->
      <ElCard class="create-or-pay-invoice-modal-part" shadow="never">
        <template #header> {{ $t('Services') }} </template>

        <UiModelsAutocompleteSearch
          v-if="!invoice.id"
          class="create-or-pay-invoice-modal-part-search"
          :model-value="servicesIds"
          :model-for-use="ServiceGroup"
          label="title"
          multiple
          required
          collapse-tags
          :disabled="!!invoice.id"
          @select="selectServiceGroup" />

        <div class="create-or-pay-invoice-modal-part-content">
          <ElTable class="create-or-pay-invoice-modal__services" :data="invoice.payment_subjects">
            <ElTableColumn prop="subject.title" />

            <ElTableColumn prop="subject.price">
              <template #default="{ row }">
                {{ row.subject.price ?? row.subject.total_amount }}
              </template>
            </ElTableColumn>

            <ElTableColumn v-if="!data?.id" prop="actions" width="66px">
              <template #default="{ row }">
                <ElButton text size="small" @click="deletePaymentSubject(row)">
                  <template #icon><UiIcon :icon="icons.CANCEL" /> </template>
                </ElButton>
              </template>
            </ElTableColumn>
          </ElTable>

          <ElFormItem
            class="create-or-pay-invoice-modal__discount-part"
            :label="$t('Base.Discount') + ' (%)'">
            <ElInput
              v-model="invoice.discount"
              type="number"
              placeholder="0%"
              :disabled="!!invoice.id" />
          </ElFormItem>
          <ElFormItem :label="$t('Base.Total')"> {{ totalPrice }} </ElFormItem>
        </div>
      </ElCard>

      <TransactionsTable
        v-if="!!invoice.id"
        v-show="transactions.length || loading.transactions"
        class="create-or-pay-invoice-modal-part create-or-pay-invoice-modal__transactions-table"
        height="200px"
        :items="transactions"
        :loading="loading.transactions"
        :page="1"
        :perPage="transactions.length"
        :total="transactions.length" />
    </ElForm>

    <template #footer>
      <div class="create-or-pay-invoice-modal-actions">
        <ElButton
          v-if="!data?.id"
          type="primary"
          native-type="submit"
          :loading="loading.form"
          form="create-or-pay-invoice">
          {{ $t('Base.Create') }}
        </ElButton>

        <ElButton v-if="isShowRefundButton" type="danger" plain @click="refund">
          {{ $t('Base.Refund') }}
        </ElButton>
        <ElButton v-if="isShowPayButton" type="primary" @click="pay">
          {{ $t('Base.Pay') }}
        </ElButton>
      </div>
    </template>

    <InvoicePayOrRefundModal
      v-if="!!invoice.id"
      v-model="payModalIsOpen"
      :invoice="invoice"
      :type="payType"
      append-to-body
      @action="invoicePayModalActionHandler" />
  </ElDialog>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/invoices.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="./index.locales.json" />
