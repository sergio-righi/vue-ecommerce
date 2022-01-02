import createMultiTabState from 'vuex-multi-tab-state';

export default ({ store }: any) => {
  createMultiTabState()(store);
};