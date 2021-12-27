import { GetterTree, ActionTree, MutationTree } from 'vuex';

const state = () => ({
  user: null as any,
  feedback: null as any
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  feedback(state, feedback) {
    state.feedback = feedback;
  },

  login(state, user) {
    state.user = user;
  },

  logout(state) {
    state.user = null;
  },

  release(state, user) {
    if (user) {
      state.user.locked = false;
    }
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

  release({ commit, state }) {
    return this.$repository.user.release(state.user.id).then((response: any) => {
      commit("release", response);
    });
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
