import { Context } from '@nuxt/types'

class SessionService {
  private readonly $auth: any
  private readonly store: any
  static storeName: string = "session";

  constructor(context: Context) {
    this.$auth = context.$auth
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

  setToken(accessToken: string, refreshToken: string) {
    this.store.dispatch(`${SessionService.storeName}/setToken`, { accessToken, refreshToken });
  }

  logout() {
    this.store.dispatch(`${SessionService.storeName}/logout`);
  }

  isAuthenticated() {
    return 'id' in this.user();
  }

  user() {
    return this.store.state.session.user;
  }

  clear() {
    this.store.dispatch(`${SessionService.storeName}/clear`);
  }

  async fetch() {
    const { accessToken } = this.store.state.session.sso;
    const response = await this.$auth.get('/auth/fetch', {
      headers: {
        'Authorization': accessToken
      }
    });
    if (response.data) {
      const { user, ...rest } = response.data;
      this.store.dispatch(`${SessionService.storeName}/fetch`, user);
    } else {
      this.store.dispatch(`${SessionService.storeName}/fetch`, {});
    }
  }
}

export { SessionService }