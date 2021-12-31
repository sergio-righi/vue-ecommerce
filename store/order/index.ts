import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Order } from '@/models';

const state = () => ({
  orders: [] as Order[]
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  addOrder: (state, order: Order) => {
    state.orders.push(order);
  },

  clearOrder: (state) => {
    state.orders = [] as Order[];
  }

};

const getters: GetterTree<RootState, RootState> = {
  orders: state => state.orders,
};

const actions: ActionTree<RootState, RootState> = {

  addOrder({ commit }, order) {
    commit("addOrder", order);
  },

  clearOrder({ commit }) {
    commit("clearOrder");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
