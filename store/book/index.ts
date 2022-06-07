import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { helpers } from "@/utils";
import { BookType } from "@/interfaces";

interface StateType {
  index: number
  book: BookType
  books: BookType[]
}

const state = (): StateType => ({
  index: -1 as number,
  book: {} as BookType,
  books: [] as BookType[]
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  all: (state: StateType, books: BookType[]) => {
    state.books = books;
  },

  set: (state: StateType, params: any) => {
    const { id, ...options } = params;
    let item = state.books.find(x => x._id === id) ?? {} as BookType;
    item = helpers.deepMerge(item, options);
  },

  update: (state: StateType, response: any) => {
    const { _id, ...options } = response;
    let item = state.books.find(x => x._id === _id) ?? {} as BookType;
    item = helpers.deepMerge(item, options);
  },

  clear: (state: StateType) => {
    state.index = -1;
    state.book = {} as BookType;
  },

  reset: (state: StateType) => {
    state.books = [] as BookType[];
  }
};

const getters: GetterTree<RootState, RootState> = {
  books: (state: StateType): BookType[] => state.books,//.filter((x: Book) => x.inStock > 0),
  book: (state: StateType): BookType => state.book
};

const actions: ActionTree<RootState, RootState> = {

  all: ({ commit }: any, response: any) => {
    commit("all", response);
  },

  set: ({ commit }: any, params: any) => {
    commit("set", params);
  },

  update: ({ commit }: any, response: any) => {
    commit("update", response)
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
