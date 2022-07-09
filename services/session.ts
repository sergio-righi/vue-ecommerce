import Cookies from 'js-cookie'

import { helpers } from '@/utils';
import { Context } from '@nuxt/types'

class SessionService {
  private readonly store: any
  private readonly $config: any
  static storeName: string = "session";

  constructor(context: Context) {
    this.store = context.store
    this.$config = context.$config
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

  user(): any {
    return helpers.toJSON(Cookies.get(this.$config.vuexKey))
  }

  isAuthenticated(): boolean {
    return this.user() !== null
  }

  isVerified(): boolean {
    return this.isAuthenticated() && this.user()?.verified
  }

  clear() {
    this.store.dispatch(`${SessionService.storeName}/clear`);
  }
}

export { SessionService }