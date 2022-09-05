import { createStore } from 'vuex';
import modalAndDrawer from '@/store/modalAndDrawer';
import auth from '@/store/auth';
import patients from '@/store/patients';
import doctors from '@/store/doctors';
import specialties from '@/store/specialties';
import appointments from '@/store/appointments';
import templates from '@/store/templates';

export const Store = createStore({
  state: {},
  getters: {},

  mutations: {},
  actions: {
    // сбрасываем чтобы при смене аккаунта не было старых данных
    resetGlobalDataFromModules({ dispatch }) {
      const modules = [];
      for (let key in Store._modulesNamespaceMap) {
        if (Store._modulesNamespaceMap[key]._rawModule.isCRUDModule) modules.push(key);
      }

      return Promise.all(modules.map((module) => dispatch(`${module}clearAllData`)));
    },
  },
  modules: {
    modalAndDrawer,
    auth,
    patients,
    doctors,
    specialties,
    appointments,
    templates,
  },
});
