import SecureLS from "secure-ls";
import VuexPersistence from "vuex-persist";

export default ({ store, $config }: any) => {
  const ls = new SecureLS({ isCompression: false });
  new VuexPersistence({
    key: $config.vuexKey,
    storage: {
      getItem: (key: string) => ls.get(key),
      setItem: (key: string, value: any) => ls.set(key, value),
      removeItem: (key: string) => ls.remove(key),
    } as any,
  }).plugin(store);
};
