import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { User } from "@/models";
import { helpers } from "@/utils";

const state = () => ({
  users: [] as User[],
  user: {} as User,
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  add(state, user: User) {
    state.users.push(user);
  },

  put(state, props: any) {
    state.user = helpers.deepMerge(state.user, props);
  },

  set(state, id: string) {
    state.user = state.users.find(user => user.id === id) ?? {} as User;
  },

  clear(state) {
    state.user = {} as User;
  },

  reset(state) {
    state.users = [] as User[];
  }
};

const getters: GetterTree<RootState, RootState> = {
  users: (state): User[] => state.users,
  user: (state): User => state.user
};

const actions: ActionTree<RootState, RootState> = {

  add({ commit }, user: User) {
    commit("add", user);
  },

  put({ commit }, props: any) {
    commit("put", props);
  },

  set({ commit }, id: string) {
    commit("set", id);
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
