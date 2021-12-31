import { User } from "@/models";
import { crypto } from "@/utils";

export const UserService = (store: any) => ({

  insert(user: User) {
    store.dispatch("user/add", user);
  },

  update(props: any) {
    store.dispatch("user/put", props);
  },

  username(username: string) {
    return store.state.user.users.findIndex((x: User) => x.username === username) !== -1;
  },

  login(username: string, password: string) {
    password = crypto.encrypt(password);
    const user = store.state.user.users.find((x: User) => x.username === username && x.password === password);
    if (user) {
      store.dispatch("user/set", user.id);
    }
    return user;
  },

  clear() {
    store.dispatch("user/clear");
  },
  
  reset() {
    store.dispatch("user/reset");
  }

});
