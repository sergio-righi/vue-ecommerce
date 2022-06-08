import { Context } from '@nuxt/types'
import BaseService from "./base.service";

import { AuthorRepository } from "@/repository";
import { AuthorType } from '@/interfaces';

class AuthorService extends BaseService<AuthorType> {
  static storeName: string = "author";

  constructor(context: Context) {
    super(context, new AuthorRepository(context), AuthorService.storeName)
  }

  filtered({ term }: any, page: number, count: number): { list: AuthorType[], count: number } {
    const from = (page - 1) * count;
    const to = from + count;
    const list = this.store.state.author.authors.filter((x: AuthorType) =>
      term ? x.name ? x.name.toLowerCase().includes(term.toLowerCase()) : false : true
    ).sort((a: AuthorType, b: AuthorType) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1) as AuthorType[];
    return { list: list.slice(from, to) as AuthorType[], count: list.length };
  }
}

export { AuthorService }