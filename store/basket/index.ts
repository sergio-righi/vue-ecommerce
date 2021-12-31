import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { helpers } from "@/utils";
import { Item } from "@/models";

const state = () => ({
  index: -1 as number,
  basket: [] as Item[],
  item: {} as Item
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  set: (state, { id, count }) => {
    const item = state.basket.find(x => x.bookId === id) ?? {} as Item;
    item.count = count;
  },

  add: (state, { id, count }) => {
    state.basket.push(new Item({ bookId: id, count: count, discount: 0, price: 0 }));
  },

  put: (state, item: Item) => {
    state.item = state.basket.find(x => x.bookId === item.bookId) ?? {} as Item;
    state.item = helpers.deepMerge(state.item, item);
  },

  delete: (state, id: string) => {
    state.item = state.basket.find(x => x.bookId === id) ?? {} as Item;
    state.index = state.basket.findIndex(x => x.bookId === id);
    state.basket.splice(state.index, 1);
  },

  recover: state => {
    state.basket.splice(state.index, 0, state.item);
    state.item = {} as Item;
  },

  clear: state => {
    state.item = {} as Item;
  },

  reset: state => {
    state.basket = [] as Item[];
  }

};

const getters: GetterTree<RootState, RootState> = {
  sum: state => state.basket.reduce((a, b) => a + b.count, 0),
  basket: state => state.basket,
  count: state => state.basket.length,
  item: state => state.item
};

const actions: ActionTree<RootState, RootState> = {

  all({ commit, state }) {
    commit("all", state.basket);
  },

  set({ commit }, { id, count }) {
    commit("set", { id, count });
  },

  add({ commit }, { id, count }) {
    commit("add", { id, count });
  },

  put({ commit }, item) {
    commit("put", item);
  },

  delete({ commit, }, id) {
    commit("delete", id);
  },

  recover({ commit }) {
    commit("recover");
  },

  clear({ commit }) {
    commit("clear");
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
