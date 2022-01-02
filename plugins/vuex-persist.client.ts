import VuexPersistence from "vuex-persist";

export default ({ store }: any) => {
  new VuexPersistence({
    key: 'the-book-store',
  }).plugin(store);
};
