// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { FeedbackType } from "@/interfaces"

interface StateType {
  auth: any
  redirect: string | null
  feedback: FeedbackType
  items: Array<{ id: string, count: number }>
}

const state = (): StateType => ({
  auth: {},
  redirect: null,
  feedback: {} as FeedbackType,
  items: [] as { id: string, count: number }[]
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  item: (state: StateType, params: any) => {
    const { id, count } = params
    const index = state.items.findIndex(item => item.id === id)
    if (index === -1) {
      state.items.push({ id, count })
    } else {
      state.items[index].count = count
    }
  },

  feedback: (state: StateType, feedback: FeedbackType) => {
    state.feedback = feedback;
  },

  redirect: (state: StateType, path: string) => {
    state.redirect = path;
  },

  clear: (state: StateType) => {
    state.feedback = {} as FeedbackType;
  }
};

const getters: GetterTree<RootState, RootState> = {
  logged: (state: StateType) => state.auth.user,
  feedback: (state: StateType) => state.feedback,
  isAuthenticated: (state: StateType) => state.auth.loggedIn,
};

const actions: ActionTree<RootState, RootState> = {

  item: ({ commit }, params: any) => {
    commit("item", params);
  },

  feedback: ({ commit }: any, feedback: FeedbackType) => {
    commit("feedback", feedback);
  },

  redirect: ({ commit }: any, path: string) => {
    commit("redirect", path);
  },

  clear: ({ commit }: any) => {
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
