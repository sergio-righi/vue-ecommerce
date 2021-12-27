
export const SessionService = (store: any) => ({

  user() {
    return store.state.session.user.id;
  },

  feedback(message: string, error: boolean = false) {
    store.dispatch("session/feedback", { message, error });
  },

  login(user: Object) {
    store.dispatch("session/login", user);
  },

  logout() {
    store.dispatch("session/logout");
  },

  release() {
    store.dispatch("session/release");
  },

  clear() {
    store.dispatch("session/clear");
  }

});
