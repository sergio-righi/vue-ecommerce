import { Context } from '@nuxt/types'
import BaseService from "./base.service";

import { token as tk } from "@/utils";
import { TokenType } from '@/interfaces';
import { TokenRepository } from '@/repository';

class TokenService extends BaseService<TokenType> {
  static storeName: string = "token";

  constructor(context: Context) {
    super(context, new TokenRepository(context), TokenService.storeName)
  }

  async insertWithCode(token: TokenType) {
    token.code = tk.generateCode()
    return await this.create(token);
  }

  async insertWithToken(token: TokenType) {
    token.number = tk.generateKey()
    return await this.create(token);
  }

  async findByUser(user: string, code: boolean = false) {
    const params = code ? { number: { $exists: false } } : { code: { $exists: false } };
    return await this.findOne({ user, ...params, done: { $exists: false }, expires: { $gte: new Date() } });
  }

  async findByToken(number: string) {
    return await this.findOne({ number, done: { $exists: false }, expires: { $gte: new Date() } });
  }

  async findByCode(user: string, code: string) {
    return await this.findOne({ user, code, done: { $exists: false }, expires: { $gte: new Date() } });
  }

  async done(id: string) {
    return await this.repository.done(id);
  }

  async undone(id: string) {
    return await this.repository.undone(id);
  }

  async reset(id: string, query: string) {
    return await this.repository.reset(id, query);
  }
}

export { TokenService }