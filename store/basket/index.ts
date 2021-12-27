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

  setItem: (state, { id, count }) => {
    const item = state.basket.find(x => x.bookId === id) ?? {} as Item;
    item.count = count;
  },

  addItem: (state, { id, count }) => {
    state.basket.push(new Item({ bookId: id, count: count, discount: 0, price: 0 }));
  },

  putItem: (state, item: Item) => {
    state.item = helpers.deepMerge(state.item, item);
  },

  deleteItem: (state, id) => {
    state.item = state.basket.find(x => x.bookId === id) ?? {} as Item;
    state.index = state.basket.findIndex(x => x.bookId === id);
    state.basket.splice(state.index, 1);
  },

  recoverItem: state => {
    state.basket.splice(state.index, 0, state.item);
    state.item = {} as Item;
  },

  clearItem: state => {
    state.item = {} as Item;
  },

  clearBasket: state => {
    state.basket = [];
  }
};

const getters: GetterTree<RootState, RootState> = {
  sum: state => state.basket.reduce((a, b) => a + b.count, 0),
  basket: state => state.basket,
  count: state => state.basket.length,
  item: state => state.item
};

const actions: ActionTree<RootState, RootState> = {

  fetchBasket({ commit, state }) {
    commit("setBasket", state.basket);
  },

  fetchItem({ commit }, id) {
    // commit("setItem", id);
  },

  setItem({ commit }, { id, count }) {
    commit("setItem", { id, count });
  },

  addItem({ commit }, { id, count }) {
    commit("addItem", { id, count });
  },

  putItem({ commit, state }) {
    commit("putItem", state.item);
  },

  deleteItem({ commit, }, id) {
    commit("deleteItem", id);
  },

  recoverItem({ commit }) {
    commit("recoverItem");
  },

  clearBasket({ commit }) {
    commit("clearBasket");
  },

  clearItem({ commit }) {
    commit("clearItem");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
