import { ApiService } from '@/services/api.service';
import { Router } from '@/router';
import { LOGIN_ROUTE } from '@/router/auth.routes';
import { parseJwtToken } from '@/utils/jwt.util';

const enums = {
  ACCESS_TOKEN_KEY: 'access_token',
  USER_KEY: 'user',
};

export default {
  namespaced: true,
  state() {
    return {
      /** @type User */
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
     * @param {string} email
     * @param {string} password
     * @return {Promise<void>}
     */
    async logIn({ commit }, { email, password }) {
      const { data } = await ApiService.post('/auth/login', { email, password });

      ApiService.setToken(data.access_token);
      localStorage.setItem(enums.ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(enums.USER_KEY, JSON.stringify(data.user));
      commit('LOGIN', { user: data.user });
    },

    async checkAndSetUserAndTokenFromClientStorage({ commit }) {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) return;

      if (access_token) {
        const payload = parseJwtToken(access_token);
        // Если осталось меньше 10 минут не логиним
        if (payload.exp <= payload.iat + 1000 * 60 * 10) return;

        ApiService.setToken(access_token);
        commit('SET_USER', JSON.parse(localStorage.getItem('user')));
        commit('SET_IS_AUTHORIZED', true);
      }
    },

    async logout({ commit, dispatch }) {
      commit('LOGOUT');
      await Router.push(LOGIN_ROUTE);
      ApiService.removeToken();
      localStorage.removeItem(enums.ACCESS_TOKEN_KEY);
      localStorage.removeItem(enums.USER_KEY);
      dispatch('resetGlobalDataFromModules', {}, { root: true });
    },
  },
};
