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

  setBooks: (state, books: Book[]) => {
    state.books = books;
  },

  setBook: (state, { id, book }) => {
    state.book = state.books.find(x => x.id === id) ?? {} as Book;
    state.book = helpers.deepMerge(state.book, book);
  },

  setBookSlug: (state, { slug }) => {
    state.book = state.books.find(x => new Book(x).slug === slug) ?? {} as Book;
    // state.book = helpers.deepMerge(state.book, book);
  },

  clearBooks: (state) => {
    state.books = [] as Book[]
  },

  clearBook: (state) => {
    state.index = -1;
    state.book = {} as Book
  }
};

const getters: GetterTree<RootState, RootState> = {
  books: (state): Book[] => state.books,//.filter((x: Book) => !x.deleted),
  book: (state): Book => state.book
};

const actions: ActionTree<RootState, RootState> = {

  fetchBooks({ commit }) {
    return this.$repository.book.all().then((response: Book[]) => {
      commit("setBooks", response);
    });
  },

  fetchBook({ commit }, id) {
    commit("setBook", { id });
  },

  fetchBookSlug({ commit }, slug) {
    commit("setBookSlug", { slug });
  },

  clearBooks({ commit }) {
    commit("clearBooks");
  },

  clearBook({ commit }) {
    commit("clearBook");
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
