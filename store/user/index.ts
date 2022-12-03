// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from "vuex";

import { UserModel } from "@/models";
import { UserType } from "@/interfaces";
import { helpers } from "@/utils";

interface StateType {
  user: UserType;
}

const state = (): StateType => ({
  user: new UserModel() as UserType,
});

export type RootState = ReturnType<typeof state>;

const mutations: MutationTree<RootState> = {
  /**
   * it inserts the new item into the stored list
   */

  create: (state: StateType, user: UserType) => {
    state.user = user;
  },

  /**
   * it updates the current item
   */

  update: (state: StateType, response: any) => {
    const { _id, ...options } = response;
    state.user = helpers.deepMerge(state.user, options);
  },

  /**
   * it modified the stored value with the updated ones
   */

  set: (state: StateType, user: UserType) => {
    state.user = helpers.deepMerge(state.user, user);
  },

  /**
   * it attributes to the current item
   */

  find: (state: StateType, user: UserType) => {
    state.user = user;
  },

  /**
   * it unselects an item from the list
   */

  reset: (state: StateType) => {
    state.user = new UserModel() as UserType;
  }
};

const getters: GetterTree<RootState, RootState> = {
  user: (state: StateType) => state.user,
  wishlist: (state: StateType): string[] => state.user?.wishlist ?? [],
};

const actions: ActionTree<RootState, RootState> = {
  all: ({ commit }: any, response: any) => { },

  find: ({ commit }: any, response: any) => {
    commit("find", response);
  },

  create: ({ commit }: any, response: any) => {
    commit("create", response);
  },

  update: ({ commit }: any, response: any) => {
    commit("update", response);
  },

  soft: ({ commit }: any, response: any) => { },

  restore: ({ commit }: any, response: any) => { },

  set: ({ commit }: any, response: any) => {
    commit("set", response);
  },

  reset: ({ commit }: any) => {
    commit("reset");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
