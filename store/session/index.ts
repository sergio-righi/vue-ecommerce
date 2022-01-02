import { GetterTree, ActionTree, MutationTree } from 'vuex';

const state = () => ({
  feedback: null as any,
  redirect: null as any,
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  feedback(state, feedback: any) {
    state.feedback = feedback;
  },

  logout(state) {
    state.redirect = null;
    state.feedback = null;
  },

  redirect(state, path: any) {
    state.redirect = path;
  },

  clear(state) {
    state.feedback = null;
  }

};

const getters: GetterTree<RootState, RootState> = {
  feedback: state => state.feedback
};

const actions: ActionTree<RootState, RootState> = {

  logout({ commit }) {
    commit("logout");
  },

  redirect({ commit }, path: any) {
    commit("redirect", path);
  },

  feedback({ commit }, feedback: any) {
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