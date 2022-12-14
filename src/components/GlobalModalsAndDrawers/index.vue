<template>
  <component
    v-if="isModalOpen"
    :is="modalComponent"
    v-model="modalModel"
    v-bind="modalPayload"
    @action="modalActionHandler" />

  <component
    v-if="isDrawerOpen"
    :is="drawerComponent"
    v-model="drawerModel"
    :direction="$options.DRAWER_DEFAULT_DIRECTION"
    :size="$options.DRAWER_DEFAULT_SIZE"
    v-bind="drawerPayload"
    @action="drawerActionHandler" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { EmitterService } from '@/services/emitter.service';
import {
  GLOBAL_DRAWER_ACTION,
  GLOBAL_DRAWER_CLOSE,
  GLOBAL_MODAL_ACTION,
  GLOBAL_MODAL_CLOSE,
} from '@/enums/modalAndDrawer.enum';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import { DRAWER_DEFAULT_DIRECTION, DRAWER_DEFAULT_SIZE } from '@/config/ui.config';

export default {
  name: 'GlobalModalsAndDrawers',
  DRAWER_DEFAULT_DIRECTION: DRAWER_DEFAULT_DIRECTION,
  DRAWER_DEFAULT_SIZE: DRAWER_DEFAULT_SIZE,
  computed: {
    ...mapState({
      modalComponent: (state) => state.modalAndDrawer.modal.component,
      modalPayload: (state) => state.modalAndDrawer.modal.payload,
      isModalOpen: (state) => state.modalAndDrawer.modal.isOpen,

      drawerComponent: (state) => state.modalAndDrawer.drawer.component,
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
  watch: {
    '$route.path'() {
      this.forceCloseModal();
      this.forceCloseDrawer();
    },
  },

  methods: {
    ...mapActions({
      closeModal: 'modalAndDrawer/closeModal',
      forceCloseModal: 'modalAndDrawer/forceCloseModal',
      closeDrawer: 'modalAndDrawer/closeDrawer',
      forceCloseDrawer: 'modalAndDrawer/forceCloseDrawer',
    }),

    modalActionHandler(action) {
      EmitterService.emit(GLOBAL_MODAL_ACTION, action);
      this.closeModal();
    },
    drawerActionHandler(action) {
      EmitterService.emit(GLOBAL_DRAWER_ACTION, action);
      this.closeDrawer();
    },
  },
};
</script>
