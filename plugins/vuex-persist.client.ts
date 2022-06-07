import VuexPersistence from "vuex-persist";
import { config } from "@/utils"

export default ({ store }: any) => {
  new VuexPersistence({ key: config.persistKey }).plugin(store);
};
