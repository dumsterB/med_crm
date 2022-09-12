/** @typedef UserPayload
 *  @property {boolean} has_active_appointment
 */

export default {
  namespaced: true,
  state: {
    /** @type {UserPayload} userPayload */
    userPayload: {
      has_active_appointment: false,
    },
  },
  getters: {
    user(state, getters, rootState, rootGetters) {
      return { ...rootState.auth.user, ...state.userPayload };
    },
  },

  mutations: {
    SET_PAYLOAD: (state, payload) => (state.userPayload.has_active_appointment = payload),

    /**
     * @param state
     * @param {object} payload
     * @param {string} payload.key
     * @param {*} payload.value
     */
    SET_PAYLOAD_BY_KEY: (state, payload) => (state.userPayload[payload.key] = payload.value),
  },
  actions: {
    setPayload({ commit }, payload) {
      commit('SET_PAYLOAD', payload);
    },

    /**
     * @param commit
     * @param {object} payload
     * @param {string} payload.key
     * @param {*} payload.value
     */
    setPayloadByKey({ commit }, payload) {
      commit('SET_PAYLOAD_BY_KEY', payload);
    },
  },
};
