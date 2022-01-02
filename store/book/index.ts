import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { Book } from "@/models";
import { helpers } from "@/utils";

const state = () => ({
  index: -1 as number,
  books: [] as Book[],
  book: {} as Book
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  all: (state, books: Book[]) => {
    state.books = books;
  },

  set: (state, { id, count }) => {
    let item = state.books.find(x => x.id === id) ?? {} as Book;
    item = helpers.deepMerge(item, count);
  },

  put: (state, { id, props }) => {
    let item = state.books.find(x => x.id === id) ?? {} as Book;
    item = helpers.deepMerge(item, props);
  },

  clear: (state) => {
    state.index = -1;
    state.book = {} as Book;
  },

  reset: (state) => {
    state.books = [] as Book[];
  }

};

const getters: GetterTree<RootState, RootState> = {
  books: (state): Book[] => state.books,//.filter((x: Book) => x.inStock > 0),
  book: (state): Book => state.book
};

const actions: ActionTree<RootState, RootState> = {

  all({ commit }) {
    return this.$repository.book.all().then((response: Book[]) => {
      commit("all", response);
    });
  },

  set({ commit }, { id, count }) {
    commit("set", { id, count });
  },

  put({ commit }, { id, props }) {
    commit("put", { id, props });
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
