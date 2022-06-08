import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { helpers } from "@/utils";
import { AuthorType } from "@/interfaces";

interface StateType {
  index: number
  author: AuthorType
  authors: AuthorType[]
}

const state = (): StateType => ({
  index: -1 as number,
  author: {} as AuthorType,
  authors: [] as AuthorType[]
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  all: (state: StateType, authors: AuthorType[]) => {
    state.authors = authors;
  },

  find: (state: StateType, author: AuthorType) => {
    state.author = author;
  },

  set: (state: StateType, author: any) => {
    state.author = helpers.deepMerge(state.author, author)
  },

  create: (state: StateType, author: AuthorType) => {
    state.authors.push(author);
  },

  update: (state: StateType, response: any) => {
    const { _id, ...options } = response;
    let item = state.authors.find(x => x._id === _id) ?? {} as AuthorType;
    item = helpers.deepMerge(item, options);
  },

  clear: (state: StateType) => {
    state.index = -1;
    state.author = {} as AuthorType;
  },

  reset: (state: StateType) => {
    state.authors = [] as AuthorType[];
  }
};

const getters: GetterTree<RootState, RootState> = {
  authors: (state: StateType): AuthorType[] => state.authors,
  author: (state: StateType): AuthorType => state.author
};

const actions: ActionTree<RootState, RootState> = {

  all: ({ commit }: any, response: any) => {
    commit("all", response);
  },

  find: ({ commit }: any, response: any) => {
    commit("find", response);
  },

  set: ({ commit }: any, params: any) => {
    console.log(params);
    commit("set", params);
  },

  create: ({ commit }: any, response: any) => {
    commit("create", response)
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
