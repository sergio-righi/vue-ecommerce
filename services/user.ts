import { User } from "@/models";
import { crypto } from "@/utils";

export const UserService = (store: any) => ({

  insert(user: User) {
    store.dispatch("user/addUser", user);
  },

  update(prop: any) {
    store.commit("user/updateUser", prop);
  },

  username(username: string) {
    return store.state.user.users.findIndex((x: User) => x.username === username) !== -1;
  },

  login(username: string, password: string) {
    password = crypto.encrypt(password);
    const user = store.state.user.users.find((x: User) => x.username === username && x.password === password);
    if (user) {
      store.dispatch("user/setUser", user.id);
    }
    return user;
  },

  clear() {
    store.dispatch("user/clearUser");
  }

});
