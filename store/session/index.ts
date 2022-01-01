import { GetterTree, ActionTree, MutationTree } from 'vuex';

const state = () => ({
  user: null as any,
  feedback: null as any,
  redirect: null as any,
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  feedback(state, feedback: any) {
    state.feedback = feedback;
  },

  login(state, user: any) {
    state.user = user;
  },

  logout(state) {
    state.user = null;
  },

  redirect(state, path: any) {
    state.redirect = path;
  },

  clear(state) {
    state.feedback = null;
  }

};

const getters: GetterTree<RootState, RootState> = {
  user: state => state.user,
  feedback: state => state.feedback,
  isAuthenticated: state => !!state.user
};

const actions: ActionTree<RootState, RootState> = {

  login({ commit }, user) {
    commit("login", user);
  },

  logout({ commit }) {
    commit("logout");
  },

  redirect({ commit }, path) {
    commit("redirect", path);
  },

  feedback({ commit }, feedback) {
    commit("feedback", feedback);
  },

  clear({ commit }) {
    commit("clear");
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};