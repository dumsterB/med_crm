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
        name: '',
        payload: {},
        isOpen: null,
      },
      drawer: {
        name: '',
        payload: {},
        isOpen: null,
      },
    };
  },
  mutations: {
    /**
     * @param state
     * @param {"modal"|"drawer"} type
     * @param {string} name
     * @param {object} payload
     * @constructor
     */
    OPEN(state, { type, name, payload = {} }) {
      state[type].name = name;
      state[type].payload = payload;
      state[type].isOpen = true;
    },

    CLOSE(state, { type }) {
      state[type].name = '';
      state[type].payload = {};
      state[type].isOpen = false;
    },
  },
  actions: {
    /**
     * @param dispatch
     * @param {string|object} optionsOrName
     * @param {string} optionsOrName.name
     * @param {object} optionsOrName.payload
     * @return {Promise<*>}
     */
    async openModal({ dispatch }, optionsOrName) {
      return dispatch('_open', { type: 'modal', payload: optionsOrName });
    },

    /**
     * @param dispatch
     * @param {string|object} optionsOrName
     * @param {string} optionsOrName.name
     * @param {object} optionsOrName.payload
     * @return {Promise<*>}
     */
    async openDrawer({ dispatch }, optionsOrName) {
      return dispatch('_open', { type: 'drawer', optionsOrName });
    },

    /**
     * @param commit
     * @param {"modal"|"drawer"} type
     * @param {string|object} optionsOrName
     * @param {string} optionsOrName.name
     * @param {object} optionsOrName.payload
     * @return {Promise<*>}
     */
    async _open({ commit }, { type, optionsOrName }) {
      const payload = typeof optionsOrName !== 'string' ? payload : { name: payload };
      commit('OPEN', { type: 'payload', ...payload });

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

    forceCloseModal() {
      EmitterService.emit(GLOBAL_MODAL_CLOSE, new GlobalModalCloseAction());
    },
    forceCloseDrawer() {
      EmitterService.emit(GLOBAL_DRAWER_CLOSE, new GlobalDrawerCloseAction());
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
