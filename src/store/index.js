import { createStore } from 'vuex';
import modalAndDrawer from '@/store/modalAndDrawer';
import auth from '@/store/auth';
import patients from '@/store/patients';
import doctors from '@/store/doctors';

export const Store = createStore({
  state: {},
  getters: {},

  mutations: {},
  actions: {},
  modules: {
    modalAndDrawer,
    auth,
    patients,
    doctors,
  },
});
