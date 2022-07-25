export const StoreCRUDModule = {
  namespaced: true,
  state: () => ({
    data: [],
    total: 0,
    loading: false,
  }),
  getters: {},

  mutations: {
    SET_TOTAL(state, count) {
      state.total = count;
    },
    SET_DATA(state, items = []) {
      // убираем дупликаты
      state.data = items.filter(
        (item, index) =>
          !items.slice(index + 1).find((elem) => elem.id && item.id && elem.id == item.id)
      );
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },

    ADD_ITEM(state, item) {
      state.data = [item, ...state.data];
      state.total = state.total + 1;
    },
    EDIT_ITEM(state, item) {
      const index = state.data.findIndex((elem) => elem.id == item.id);
      state.data = [...state.data.slice(0, index), item, ...state.data.slice(index + 1)];
    },
    DELETE_ITEM(state, item) {
      const index = state.data.findIndex((elem) => elem.id == item.id);

      state.data = [...state.data.slice(0, index), ...state.data.slice(index + 1)];
      state.total = state.total - 1;
    },
  },

  actions: {
    /**
     * @param state
     * @param commit
     * @param payload
     * @param { object[] } payload.items
     * @param { number } [payload.total = payload.items.length]
     * @param { boolean } payload.overwriteDataState
     */
    setData({ state, commit }, payload) {
      commit(
        'SET_DATA',
        payload.overwriteDataState ? payload.items : { ...state.data, ...payload.items }
      );
      commit('SET_TOTAL', payload.total ?? payload.items.length);
    },
    async createItem({ commit }, item) {
      commit('ADD_ITEM', { ...item });
      return { ...item };
    },
    async editItem({ commit }, item) {
      commit('EDIT_ITEM', item);
    },
    async deleteItem({ commit }, item) {
      commit('DELETE_ITEM', item);
    },
    clearAllData({ commit }) {
      commit('SET_DATA', []);
      commit('SET_TOTAL', 0);
      commit('SET_LOADING', false);
    },
  },
};

/**
 * @param { Object } param
 * @param { Object } param.state state, перезапишет дефолтные state с одинаковыми ключами
 * @param { Object } param.getters getters, перезапишет дефолтные getters с одинаковыми ключом
 * @param { Object } param.mutations mutations, перезапишет дефолтные mutations с одинаковыми ключом
 * @param { Object } param.actions actions, перезапишет дефолтные actions с одинаковыми ключом
 * @returns
 */
// export class StoreCRUDModule {
//   constructor({ state, getters, mutations, actions }) {
//     namespaced = true;
//     state = () => ({
//       data: [],
//       total: 0,
//       loading: false,
//
//       ...state,
//     });
//     getters = {
//       ...getters,
//     };
//
//     mutations = {
//       SET_TOTAL(state, count) {
//         state.total = count;
//       },
//       SET_DATA(state, items = []) {
//         // убираем дупликаты
//         state.data = items.filter(
//           (item, index) =>
//             !items.slice(index + 1).find((elem) => elem.id && item.id && elem.id == item.id)
//         );
//       },
//       SET_LOADING(state, value) {
//         state.loading = value;
//       },
//
//       ADD_ITEM(state, item) {
//         state.data = [item, ...state.data];
//         state.total = state.total + 1;
//       },
//       EDIT_ITEM(state, item) {
//         const index = state.data.findIndex((elem) => elem.id == item.id);
//         state.data = [...state.data.slice(0, index), item, ...state.data.slice(index + 1)];
//       },
//       DELETE_ITEM(state, item) {
//         const index = state.data.findIndex((elem) => elem.id == item.id);
//
//         state.data = [...state.data.slice(0, index), ...state.data.slice(index + 1)];
//         state.total = state.total - 1;
//       },
//
//       ...mutations,
//     };
//
//     actions = {
//       /**
//        * @param state
//        * @param commit
//        * @param payload
//        * @param { object[] } payload.items
//        * @param { number } [payload.total = payload.items.length]
//        * @param { boolean } payload.overwriteDataState
//        */
//       setData({ state, commit }, payload) {
//         commit(
//           'SET_DATA',
//           payload.overwriteDataState ? payload.items : { ...state.data, ...payload.items }
//         );
//         commit('SET_TOTAL', payload.total ?? payload.items.length);
//       },
//       async createItem({ commit }, item) {
//         commit('ADD_ITEM', { ...item });
//         return { ...item };
//       },
//       async editItem({ commit }, item) {
//         commit('EDIT_ITEM', item);
//       },
//       async deleteItem({ commit }, item) {
//         commit('DELETE_ITEM', item);
//       },
//       clearAllData({ commit }) {
//         commit('SET_DATA', []);
//         commit('SET_TOTAL', 0);
//         commit('SET_LOADING', false);
//       },
//
//       ...actions,
//     };
//   }
// }
