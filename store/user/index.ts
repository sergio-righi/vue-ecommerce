import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { User } from "@/models";
import { helpers } from "@/utils";

const state = () => ({
  users: [] as User[],
  user: {} as User,
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  addUser(state, user: User) {
    state.users.push(user);
  },

  updateUser(state, user) {
    state.user = helpers.deepMerge(state.user, user);
  },

  setUser(state, id: string) {
    state.user = state.users.find(user => user.id === id) ?? {} as User;
  },

  clearUser(state) {
    state.user = {} as User;
  }
};

const getters: GetterTree<RootState, RootState> = {
  users: (state): User[] => state.users,
  user: (state): User => state.user
};

const actions: ActionTree<RootState, RootState> = {

  addUser({ commit }, user: User) {
    commit("addUser", user);
  },

  setUser({ commit }, id: string) {
    commit("setUser", id);
  },

  clearUser({ commit }) {
    commit("clearUser");
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
