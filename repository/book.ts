import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { BookModel } from '@/models';
import { BookType } from '@/interfaces';

import Books from "@/assets/data/book.json";

class BookRepository extends BaseRepository<BookType> {
  static controllerName: string = "/books";

  constructor(context: Context) {
    super(context, BookModel, BookRepository.controllerName)
  }

  async all() {
    return Books;
  }

  async findWithAuthors(options: any): Promise<BookType | any> {
    // const response = await this.context.$axios.post(`${BookRepository.controllerName}/find-with-authors`, options);
    // return response.data ? new BookModel(response.data) : null;
    const response: any = Books.find((item: any) => item.slug === options.slug);
    return response ? new BookModel(response) : null;
  }
}

export { BookRepository }