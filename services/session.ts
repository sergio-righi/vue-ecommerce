
export const SessionService = (store: any) => ({

  user() {
    return store.state.user.id;
  },

  feedback(message: string, error: boolean = false) {
    store.dispatch("session/feedback", { message, error });
  },

  logout() {
    store.dispatch("user/clear");
    store.dispatch("session/logout");
  },

  redirect(path: string) {
    store.dispatch("session/redirect", path);
  },

  clear() {
    store.dispatch("session/clear");
  }

});
