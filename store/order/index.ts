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

};

const getters: GetterTree<RootState, RootState> = {
  orders: state => state.orders,
};

const actions: ActionTree<RootState, RootState> = {

  addOrder({ commit }, order) {
    commit("addOrder", order)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
