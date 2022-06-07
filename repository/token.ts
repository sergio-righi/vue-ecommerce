import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { TokenModel } from '@/models';
import { TokenType } from '@/interfaces';

class TokenRepository extends BaseRepository<TokenType> {
  static controllerName: string = "/tokens";

  constructor(context: Context) {
    super(context, TokenModel, TokenRepository.controllerName)
  }

  async done(id: string): Promise<boolean> {
    if (!id) return false;
    const response = await this.context.$axios.patch(`${TokenRepository.controllerName}/done/${id}`);
    return !!response.data;
  }

  async undone(id: string): Promise<boolean> {
    const response = await this.context.$axios.patch(`${TokenRepository.controllerName}/undone/${id}`);
    return !!response.data;
  }

  async reset(id: string, query: string) {
    const response = await this.context.$axios.patch(`${TokenRepository.controllerName}/reset/${id}`, query);
    return !!response.data;
  }
}

export { TokenRepository }