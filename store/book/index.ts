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

  find: (state, slug) => {
    state.book = state.books.find(x => x.slug === slug) ?? {} as Book;
  },

  set: (state, { id, count }) => {
    state.book = state.books.find(x => x.id === id) ?? {} as Book;
    state.book = helpers.deepMerge(state.book, count);
  },

  put: (state, book: Book) => {
    state.book = state.books.find(x => x.id === book.id) ?? {} as Book;
    state.book = helpers.deepMerge(state.book, book);
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

  find({ commit }, slug) {
    commit("find", slug);
  },

  set({ commit }, { id, count }) {
    commit("set", { id, count });
  },

  put({ commit }, book) {
    commit("put", book);
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
