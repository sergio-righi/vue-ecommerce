// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { UserModel } from '@/models';
import { UserType } from "@/interfaces";
import { helpers } from "@/utils";

interface StateType {
  index: number
  users: UserType[]
  user: UserType
}

const state = (): StateType => ({
  index: -1 as number,
  users: [] as UserType[],
  user: new UserModel() as UserType
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  /**
   * it inserts the new item into the stored list
   */

  create: (state: StateType, user: UserType) => {
    state.user = user
    state.users.push(user)
  },

  /**
   * it updates the status of an item on the stored list (deleted)
   */

  soft: (state: StateType) => {
    state.index = state.users.findIndex(x => x._id === state.user._id);
    state.users.splice(state.index, 1);
  },

  /**
   * it updates the status of an item on the stored list (not deleted)
   */

  restore: (state: StateType) => {
    state.users.splice(state.index, 0, state.user);
  },

  /**
   * it modified the stored value with the updated ones
   */

  set: (state: StateType, user: UserType) => {
    state.user = helpers.deepMerge(state.user, user)
  },

  /**
   * it unselects an item from the list
   */

  clear: (state: StateType) => {
    state.index = -1;
    state.user = new UserModel() as UserType
  }
};

const getters: GetterTree<RootState, RootState> = {
  users: (state: StateType) => state.users.filter(x => !x.deleted),
  user: (state: StateType) => state.user,
  wishlist: (state: StateType): string[] => state.user?.wishlist ?? [],
};

const actions: ActionTree<RootState, RootState> = {

  all: ({ commit }: any, response: any) => {
  },

  find: ({ commit }: any, response: any) => {
  },

  create: ({ commit }: any, response: any) => {
    commit("create", response)
  },

  update: ({ commit }: any, response: any) => {
    // commit("update", response);
  },

  soft: ({ commit }: any, response: any) => {
    commit("soft", response);
  },

  restore: ({ commit }: any, response: any) => {
    commit("restore", response);
  },

  set: ({ commit }: any, response: any) => {
    commit("set", response);
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
