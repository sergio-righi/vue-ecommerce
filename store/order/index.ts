import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Order } from '@/models';

const state = () => ({
  orders: [] as Order[]
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  add: (state, order: Order) => {
    state.orders.push(order);
  },

  reset: (state) => {
    state.orders = [] as Order[];
  }

};

const getters: GetterTree<RootState, RootState> = {
  orders: state => state.orders as Order[],
};

const actions: ActionTree<RootState, RootState> = {

  add({ commit }, order) {
    commit("add", order);
  },

  reset({ commit }) {
    commit("reset");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
