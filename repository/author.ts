import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { AuthorModel } from '@/models';
import { AuthorType } from '@/interfaces';

class AuthorRepository extends BaseRepository<AuthorType> {
  static controllerName: string = "/authors";

  constructor(context: Context) {
    super(context, AuthorModel, AuthorRepository.controllerName)
  }
}

export { AuthorRepository }