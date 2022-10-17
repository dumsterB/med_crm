<template>
  <ElUpload
    class="ui-upload"
    :file-list="fileList"
    :multiple="multiple"
    :disabled="disabled"
    :drag="false"
    :auto-upload="false"
    :on-preview="handlePreview"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :before-remove="handleBeforeRemove">
    <ElButton type="primary" plain>
      <template #icon> <UiIcon :icon="icons.DOWNLOAD" /> </template>
      {{ $t('Base.Download') }}
    </ElButton>
  </ElUpload>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { File as FileModel } from '@/models/File.model';
import { UploadFile } from '@/models/client/UploadFile.model';

export default {
  name: 'UiUpload',
  emits: ['file:add', 'file:delete', 'file:preview'],
  props: {
    files: Array,
    multiple: Boolean,
    disabled: Boolean,
    drag: Boolean,
    name: Boolean,
    value: Boolean,
  },
  computed: {
    fileList() {
      return this.files.map((file) => ({
        ...file,
        name: file.filename ?? file.name ?? 'Untitled',
        status: UploadFile.enum.statuses.Success,
      }));
    },
  },

  methods: {
    async handleChange(file, files) {
      try {
        const { data } = await FileModel.create(file, this.value, this.name);
        this.$emit('file:add', data.data[0]);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    },

    async handleBeforeRemove(file, files) {
      try {
        await FileModel.delete({ id: file.id });
        this.$emit('file:delete', file.id);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      return false;
    },

    async handlePreview(file) {
      const a = document.createElement('a');
      a.setAttribute('target', '_blank');
      a.setAttribute('href', file.link);
      a.setAttribute('download', file.name || 'Untitled');

      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    async handleRemove(file) {},
    async handleError(error, file, files) {},
    handleExceed(files, uploadFiles) {},
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
