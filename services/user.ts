import { Context } from "@nuxt/types";
import BaseService from "./base.service";

import { UserType } from "@/interfaces";
import { UserRepository } from "@/repository";

class UserService extends BaseService<UserType> {
  private readonly $enum: any;
  static storeName: string = "user";

  constructor(context: Context) {
    super(context, new UserRepository(context), UserService.storeName);
    this.$enum = context.$enum;
  }

  async findByUser(id: string) {
    return await this.findOne({ userId: id });
  }

  async setUser(user: any) {
    this.store.dispatch("user/find", user);
  }

  async updateDepth(params: any): Promise<void> {
    const { _id } = this.user();
    if (_id) {
      await this.update({ _id, ...params });
    }
  }

  user() {
    return this.store.state.user.user;
  }

  reset() {
    this.store.dispatch("user/reset");
  }

  isAdmin() {
    const { roles } = this.store.state.user.user;
    if (roles) {
      return roles.includes(this.$enum.enumerable.EnumRole.adm);
    }
    return false;
  }

  inWishlist(id: string) {
    const { wishlist } = this.store.state.user.user;
    return !!wishlist.find((item) => item === id);
  }

  async manageWishlist(id: string) {
    const { _id } = this.store.state.user.user;
    let wishlist = this.store.state.user?.user.wishlist ?? [];
    if (this.inWishlist(id)) {
      wishlist = [...wishlist.filter((x: string) => x !== id)];
    } else {
      wishlist = [id, ...wishlist];
    }
    await this.update({ _id, wishlist } as any);
  }
}

export { UserService };
