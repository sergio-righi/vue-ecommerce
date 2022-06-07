import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { OrderType } from '@/interfaces';

interface StateType {
  orders: OrderType[]
}

const state = (): StateType => ({
  orders: [] as OrderType[]
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  add: (state: StateType, order: OrderType) => {
    state.orders.push(order);
  },

  reset: (state: StateType) => {
    state.orders = [] as OrderType[];
  }
};

const getters: GetterTree<RootState, RootState> = {
  orders: (state: StateType) => state.orders as OrderType[],
};

const actions: ActionTree<RootState, RootState> = {

  add: ({ commit }: any, order: OrderType) => {
    commit("add", order);
  },

  reset: ({ commit }: any) => {
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
