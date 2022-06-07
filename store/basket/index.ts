import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { helpers } from "@/utils";
import { ItemType } from "@/interfaces";

interface StateType {
  index: number
  item: ItemType
  basket: ItemType[]
}

const state = (): StateType => ({
  index: -1 as number,
  basket: [] as ItemType[],
  item: {} as ItemType
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  set: (state: StateType, params: any) => {
    const { id, count } = params;
    const item = state.basket.find(x => x.bookId === id) ?? {} as ItemType;
    item.count = count;
  },

  add: (state: StateType, params: any) => {
    const { id, count } = params;
    const item = state.basket.find(x => x.bookId === id);
    if (!item) {
      state.basket.push({ bookId: id, count: count, discount: 0, price: 0 });
    }
  },

  put: (state: StateType, item: ItemType) => {
    state.item = state.basket.find(x => x.bookId === item.bookId) ?? {} as ItemType;
    state.item = helpers.deepMerge(state.item, item);
  },

  delete: (state: StateType, id: string) => {
    state.item = state.basket.find(x => x.bookId === id) ?? {} as ItemType;
    state.index = state.basket.findIndex(x => x.bookId === id);
    state.basket.splice(state.index, 1);
  },

  restore: (state: StateType) => {
    state.basket.splice(state.index, 0, state.item);
    state.item = {} as ItemType;
  },

  clear: (state: StateType) => {
    state.item = {} as ItemType;
  },

  reset: (state: StateType) => {
    state.basket = [] as ItemType[];
  }

};

const getters: GetterTree<RootState, RootState> = {
  sum: (state: StateType) => state.basket.reduce((a, b) => a + b.count, 0),
  basket: (state: StateType) => state.basket,
  count: (state: StateType) => state.basket.length,
  item: (state: StateType) => state.item
};

const actions: ActionTree<RootState, RootState> = {

  all: ({ commit, state }: any) => {
    commit("all", state.basket);
  },

  add: ({ commit }: any, params: any) => {
    commit("add", params);
  },

  set: ({ commit }: any, params: any) => {
    commit("set", params);
  },

  put: ({ commit }: any, item: ItemType) => {
    commit("put", item);
  },

  delete: ({ commit }: any, id: string) => {
    commit("delete", id);
  },

  restore: ({ commit }: any) => {
    commit("restore");
  },

  clear: ({ commit }: any) => {
    commit("clear");
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
