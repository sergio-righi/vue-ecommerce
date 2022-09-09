import { Context } from '@nuxt/types'

class SessionService {
  private readonly $sso: any
  private readonly store: any
  static storeName: string = "session";

  constructor(context: Context) {
    this.$sso = context.$sso
    this.store = context.store
  }

  item(id: string, count: number) {
    this.store.dispatch(`${SessionService.storeName}/item`, { id, count })
  }

  count(id: string) {
    return this.store.state.session.items.find((x: any) => x.id === id)?.count ?? 1;
  }

  feedback(message: string, error: boolean = false) {
    this.store.dispatch(`${SessionService.storeName}/feedback`, { message, error });
  }

  user() {
    return this.store.state.session.sso.user;
  }

  isAuthenticated() {
    return this.store.state.session.sso.isAuthenticated;
  }

  isVerified() {
    return this.store.state.session.sso.isVerified;
  }

  clear() {
    this.store.dispatch(`${SessionService.storeName}/clear`);
  }

  async fetch() {
    const { data } = await this.$sso.get('/auth/refresh-token');
    if (data) {
      this.store.dispatch(`${SessionService.storeName}/fetch`, { user: data.user, isAuthenticated: data.user !== null, isVerified: data.user?.verified });
    } else {
      this.store.dispatch(`${SessionService.storeName}/fetch`, {});
    }
  }
}

export { SessionService }