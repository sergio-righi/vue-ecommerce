import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { UserModel } from '@/models';
import { UserType } from '@/interfaces';

class UserRepository extends BaseRepository<UserType> {
  static controllerName: string = "/users";

  constructor(context: Context) {
    super(context, UserModel, UserRepository.controllerName)
  }
}

export { UserRepository }