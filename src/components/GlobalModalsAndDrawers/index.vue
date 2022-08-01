<template>
  <component
    v-if="isModalOpen"
    :is="modalName"
    v-model="modalModel"
    v-bind="modalPayload"
    @action="modalActionHandler" />

  <component
    v-if="isDrawerOpen"
    :is="drawerName"
    v-model="drawerModel"
    v-bind="drawerPayload"
    @action="drawerActionHandler" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { EmitterService } from '@/services/emitter.service';
import {
  GLOBAL_DRAWER_ACTION,
  GLOBAL_DRAWER_CLOSE,
  GLOBAL_MODAL_ACTION,
  GLOBAL_MODAL_CLOSE,
} from '@/enums/modalAndDrawer.enum';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  computed: {
    ...mapState({
      modalName: (state) => state.modalAndDrawer.modal.name,
      modalPayload: (state) => state.modalAndDrawer.modal.payload,
      isModalOpen: (state) => state.modalAndDrawer.modal.isOpen,

      drawerName: (state) => state.modalAndDrawer.drawer.name,
      drawerPayload: (state) => state.modalAndDrawer.drawer.payload,
      isDrawerOpen: (state) => state.modalAndDrawer.drawer.isOpen,
    }),

    modalModel: {
      get() {
        return this.isModalOpen;
      },
      set(value) {
        if (value) return;

        this.closeModal();
        EmitterService.emit(GLOBAL_MODAL_CLOSE, new GlobalModalCloseAction());
      },
    },
    drawerModel: {
      get() {
        return this.isDrawerOpen;
      },
      set(value) {
        if (value) return;

        this.closeDrawer();
        EmitterService.emit(GLOBAL_DRAWER_CLOSE, new GlobalDrawerCloseAction());
      },
    },
  },
  methods: {
    ...mapActions({
      closeModal: 'modalAndDrawer/closeModal',
      closeDrawer: 'modalAndDrawer/closeDrawer',
    }),

    modalActionHandler(action) {
      EmitterService.emit(GLOBAL_MODAL_ACTION, action);
    },
    drawerActionHandler(action) {
      EmitterService.emit(GLOBAL_DRAWER_ACTION, action);
    },
  },
};
</script>
