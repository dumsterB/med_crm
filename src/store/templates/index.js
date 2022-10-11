import { StoreCRUDModule } from '@/store/assets/StoreCRUDModule';

export default new StoreCRUDModule({
  state: {
    treatmentTemplate: null,
  },
  mutations: {
    SET_TREATMENT_TEMPLATE(state, template) {
      state.treatmentTemplate = template;
    },
  },
  actions: {
    setTreatmentTemplate({ commit }, template) {
      commit('SET_TREATMENT_TEMPLATE', template);
    },
  },
});
