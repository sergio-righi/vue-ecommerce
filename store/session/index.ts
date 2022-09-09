// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { FeedbackType } from "@/interfaces"

interface StateType {
  sso: any
  feedback: FeedbackType
  items: Array<{ id: string, count: number }>
}

const state = (): StateType => ({
  sso: {} as any,
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

  fetch: (state: StateType, params: any) => {
    state.sso = params;
  },

  clear: (state: StateType) => {
    state.feedback = {} as FeedbackType;
  }
};

const getters: GetterTree<RootState, RootState> = {
  feedback: (state: StateType) => state.feedback
};

const actions: ActionTree<RootState, RootState> = {

  item: ({ commit }, params: any) => {
    commit("item", params);
  },

  feedback: ({ commit }: any, feedback: FeedbackType) => {
    commit("feedback", feedback);
  },

  fetch: ({ commit }: any, params: any) => {
    commit("fetch", params);
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
