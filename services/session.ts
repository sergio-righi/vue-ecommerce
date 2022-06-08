import { Context } from '@nuxt/types'

import { crypto } from "@/utils";

class SessionService {
  private readonly $enum: any
  private readonly $auth: any
  private readonly store: any
  static storeName: string = "session";

  constructor({ store, $auth, $enum }: Context) {
    this.store = store;
    this.$auth = $auth;
    this.$enum = $enum;
  }

  isAdmin() {
    const { roles } = this.$auth.user;
    if (roles) {
      return roles.includes(this.$enum.enumerable.roles.adm);
    }
    return false;
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

  async login(username: string, password: string, encrypt: boolean = true) {
    password = encrypt ? crypto.encrypt(password) : password;
    await this.$auth.loginWith('local', {
      data: {
        username,
        password
      },
    })
  }

  async logout() {
    await this.$auth.logout();
  }

  async fetch() {
    const user = { ...this.$auth.user }
    user.validated = true;
    await this.$auth.setUser(user)
  }

  clear() {
    this.store.dispatch(`${SessionService.storeName}/clear`);
  }
}

export { SessionService }