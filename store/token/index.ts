// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { TokenModel } from '@/models';
import { TokenType } from "@/interfaces";
import { helpers } from "@/utils";

interface StateType {
  tokens: TokenType[]
  token: TokenType
}

const state = (): StateType => ({
  tokens: [] as TokenType[],
  token: new TokenModel() as TokenType
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  /**
   * it modified the stored value with the updated ones
   */

  set: (state: StateType, token: TokenType) => {
    state.token = helpers.deepMerge(state.token, token);
  },

  /**
   * it unselects an item from the list
   */

  clear: (state: StateType) => {
    state.token = {} as TokenType
  }
};

const getters: GetterTree<RootState, RootState> = {
  tokens: (state: StateType) => state.tokens,
  token: (state: StateType) => state.token
};

const actions: ActionTree<RootState, RootState> = {

  set: ({ commit }: any, response) => {
    commit("set", response);
  },

  clear: ({ commit }) => {
    commit("clear")
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
