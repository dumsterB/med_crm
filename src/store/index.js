import { createStore } from 'vuex';
import auth from './auth';
import patients from '@/store/patients';

export const Store = createStore({
  state: {},
  getters: {},

  mutations: {},
  actions: {},
  modules: {
    auth,
    patients,
  },
});
