import { ApiService } from '@/services/api.service';
import { Router } from '@/router';
import { LOGIN_ROUTE } from '@/router/auth.routes';

export default {
  namespaced: true,
  state() {
    return {
      user: {},
      isAuthorized: false,
    };
  },

  mutations: {
    SET_USER: (state, user) => (state.user = user),
    SET_IS_AUTHORIZED: (state, value) => (state.isAuthorized = value),
    LOGIN: (state, { user }) => {
      state.user = user;
      state.isAuthorized = true;
    },
    LOGOUT: (state) => {
      state.user = {};
      state.isAuthorized = false;
    },
  },
  actions: {
    /**
     * @param commit
     * @param {string} login
     * @param {string} password
     * @return {Promise<void>}
     */
    async logIn({ commit }, { email, password }) {
      const { data } = await ApiService.post('/auth/login', { email, password });

      ApiService.setToken(data.access_token);
      localStorage.setItem('access_token', data.access_token);
      commit('LOGIN', { user: { id: 123, email: 'email' } });
    },

    async checkAndSetUserFromClientStorage({ commit }) {
      const access_token = localStorage.getItem('access_token');
      if (access_token) ApiService.setToken(access_token);

      // commit('LOGIN', {user: user})
    },

    logout({ commit }) {
      commit('LOGOUT');
      ApiService.removeToken();
      Router.push(LOGIN_ROUTE);
    },
  },
};
