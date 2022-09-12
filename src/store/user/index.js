/** @typedef UserPayload
 *  @property {boolean} has_active_appointment
 */

export default {
  namespaced: true,
  state: {
    /** @type {UserPayload} userPayload */
    userPayload: {
      /** @type {Appointment|object} */
      active_appointment: null,
      has_active_appointment: false,
    },
  },
  getters: {
    user(state, getters, rootState, rootGetters) {
      return { ...rootState.auth.user, ...state.userPayload };
    },
  },

  mutations: {
    SET_PAYLOAD: (state, payload) => (state.userPayload = payload),
    /**
     * @param state
     * @param {object} payload
     * @param {string} payload.key
     * @param {*} payload.value
     */
    SET_PAYLOAD_BY_KEY: (state, payload) => (state.userPayload[payload.key] = payload.value),

    SET_ACTIVE_APPOINTMENT: (state, appointment) => {
      state.userPayload.active_appointment = appointment;
      state.userPayload.has_active_appointment = true;
    },
    CLOSE_ACTIVE_APPOINTMENT: (state) => {
      state.userPayload.active_appointment = null;
      state.userPayload.has_active_appointment = false;
    },
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

    setActiveAppointment({ commit }, appointment) {
      commit('SET_ACTIVE_APPOINTMENT', appointment);
    },
    closeActiveAppointment({ commit }) {
      commit('CLOSE_ACTIVE_APPOINTMENT');
    },
  },
};
