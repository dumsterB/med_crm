import { markRaw } from 'vue';
import { EmitterService } from '@/services/emitter.service';
import {
  GLOBAL_MODAL_ACTION,
  GLOBAL_MODAL_CLOSE,
  GLOBAL_DRAWER_ACTION,
  GLOBAL_DRAWER_CLOSE,
} from '@/enums/modalAndDrawer.enum';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

const promises = {
  modal: {
    resolve: null,
    reject: null,
  },
  drawer: {
    resolve: null,
    reject: null,
  },
};
setEventSubscribers();

const store = {
  namespaced: true,
  state() {
    return {
      modal: {
        component: null,
        payload: {},
        isOpen: null,
      },
      drawer: {
        component: null,
        payload: {},
        isOpen: null,
      },
    };
  },
  mutations: {
    /**
     * @param state
     * @param {"modal"|"drawer"} type
     * @param {VueComponent} component
     * @param {object} payload
     * @constructor
     */
    OPEN(state, { type, component, payload = {} }) {
      state[type].component = markRaw(component);
      state[type].payload = payload;
      state[type].isOpen = true;
    },

    CLOSE(state, { type }) {
      state[type].component = null;
      state[type].payload = {};
      state[type].isOpen = false;
    },
  },
  actions: {
    /**
     * @param dispatch
     * @param {VueComponent|object} optionsOrComponent
     * @param {VueComponent} optionsOrComponent.component
     * @param {object} optionsOrComponent.payload
     * @return {Promise<*>}
     */
    async openModal({ dispatch }, optionsOrComponent) {
      return dispatch('_open', { type: 'modal', payload: optionsOrComponent });
    },

    /**
     * @param dispatch
     * @param {VueComponent|object} optionsOrComponent
     * @param {VueComponent} optionsOrComponent.component
     * @param {object} optionsOrComponent.payload
     * @return {Promise<*>}
     */
    async openDrawer({ dispatch }, optionsOrComponent) {
      return dispatch('_open', { type: 'drawer', optionsOrComponent });
    },

    /**
     * @param commit
     * @param {"modal"|"drawer"} type
     * @param {VueComponent|object} optionsOrComponent
     * @param {VueComponent} optionsOrComponent.component
     * @param {object} optionsOrComponent.payload
     * @return {Promise<*>}
     */
    async _open({ commit }, { type, optionsOrComponent }) {
      const payload = optionsOrComponent?.component
        ? optionsOrComponent
        : { component: optionsOrComponent };

      commit('OPEN', { type: type, ...payload });

      return new Promise((resolve, reject) => {
        promises[type].resolve = resolve;
        promises[type].reject = reject;
      });
    },

    closeModal({ commit }) {
      commit('CLOSE', { type: 'modal' });
    },
    closeDrawer({ commit }) {
      commit('CLOSE', { type: 'drawer' });
    },

    forceCloseModal({ state, dispatch }) {
      if (!state.modal.isOpen) return;
      EmitterService.emit(GLOBAL_MODAL_CLOSE, new GlobalModalCloseAction());
      dispatch('closeModal');
    },
    forceCloseDrawer({ state, dispatch }) {
      if (!state.drawer.isOpen) return;
      EmitterService.emit(GLOBAL_DRAWER_CLOSE, new GlobalDrawerCloseAction());
      dispatch('closeDrawer');
    },
  },
};

function setEventSubscribers() {
  EmitterService.on(GLOBAL_MODAL_ACTION, (payload) => promises.modal.resolve(payload));
  EmitterService.on(GLOBAL_MODAL_CLOSE, (payload) => promises.modal.resolve(payload));
  EmitterService.on(GLOBAL_DRAWER_ACTION, (payload) => promises.drawer.resolve(payload));
  EmitterService.on(GLOBAL_DRAWER_CLOSE, (payload) => promises.drawer.resolve(payload));
}

export default store;
