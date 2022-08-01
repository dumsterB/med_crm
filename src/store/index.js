import { createStore } from 'vuex';
import auth from '@/store/auth';
import patients from '@/store/patients';
import modalAndDrawer from '@/store/modalAndDrawer';

export const Store = createStore({
  state: {},
  getters: {},

  mutations: {},
  actions: {},
  modules: {
    auth,
    patients,
    modalAndDrawer,
  },
});
