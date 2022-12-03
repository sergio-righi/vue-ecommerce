import { Context } from "@nuxt/types";
import BaseService from "./base.service";

import { UserType } from "@/interfaces";
import { UserRepository } from "@/repository";

class UserService extends BaseService<UserType> {
  static storeName: string = "user";
  private readonly $enum: any;

  constructor(context: Context) {
    super(context, new UserRepository(context), UserService.storeName);
    this.$enum = context.$enum;
  }

  async fetch() {
    const { _id, ...props } = this.store.state.session.user;
    const response = await this.findOne({ userId: _id });
    if (!response) {
      this.create({ userId: _id, person: { name: props.name, email: props.email }, wishlist: [], payments: [], addresses: [], following: [], roles: [], theme: false, locale: 'en-CA' })
    }
  }

  async updateDepth(params: any): Promise<void> {
    const { _id } = this.store.state.session.user;
    if (_id) {
      await this.update({ _id, ...params });
    }
  }

  user() {
    return this.store.state.user.user;
  }

  isAdmin() {
    const { roles = [] } = this.user();
    if (roles) {
      return roles.includes(this.$enum.enumerable.EnumRole.adm);
    }
    return false;
  }

  inWishlist(id: string) {
    const { wishlist = [] } = this.user();
    return !!wishlist.find((item: any) => item === id);
  }

  async manageWishlist(id: string) {
    const { _id } = this.store.state.session.user;
    let wishlist = this.user().wishlist ?? [];
    if (this.inWishlist(id)) {
      wishlist = [...wishlist.filter((x: string) => x !== id)];
    } else {
      wishlist = [id, ...wishlist];
    }
    await this.update({ _id, wishlist } as any);
  }
}

export { UserService };
