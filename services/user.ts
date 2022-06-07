import { crypto, helpers } from "@/utils";

import { Context } from '@nuxt/types'
import BaseService from "./base.service";

import { UserType } from '@/interfaces';
import { UserRepository } from "@/repository";

class UserService extends BaseService<UserType> {
  private readonly $auth: any
  static storeName: string = "user";

  constructor(context: Context) {
    super(context, new UserRepository(context), UserService.storeName)
    this.$auth = context.$auth
  }

  async findByEmail(email: string) {
    return await this.findOne({ "person.email": email });
  }

  async updateDepth(params: any): Promise<void> {
    const { _id } = this.$auth.user
    this.$auth.setUser(await this.update({ _id, ...params }));
  }

  username(username: string) {
    return this.store.state.user.users.findIndex((x: UserType) => x.username === username) !== -1;
  }

  login(username: string, password: string) {
    password = crypto.encrypt(password);
    const user = this.store.state.user.users.find((x: UserType) => x.username === username && x.password === password);
    if (user) {
      this.store.dispatch("user/set", user.id);
    }
    return user;
  }

  reset() {
    this.store.dispatch("user/reset");
  }

  inWishlist(id: string) {
    return !!this.$auth.user.wishlist.find(item => item === id);
  }

  async manageWishlist(id: string) {
    let wishlist = this.$auth.user.wishlist ?? [];
    if (this.inWishlist(id)) {
      wishlist = [...wishlist.filter((x: string) => x !== id)]
    } else {
      wishlist = [id, ...wishlist]
    }
    this.$auth.setUser(await this.update({ _id: this.$auth.user._id, wishlist } as any));
  }
}

export { UserService }