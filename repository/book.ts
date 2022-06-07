import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { BookModel } from '@/models';
import { BookType } from '@/interfaces';

class BookRepository extends BaseRepository<BookType> {
  static controllerName: string = "/books";

  constructor(context: Context) {
    super(context, BookModel, BookRepository.controllerName)
  }

  async findWithAuthors(options: any): Promise<BookType | any> {
    const response = await this.context.$axios.post(`${BookRepository.controllerName}/find-with-authors`, options);
    return response.data ? new BookModel(response.data) : null;
  }
}

export { BookRepository }