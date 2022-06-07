import { Context } from '@nuxt/types'
import BaseService from "./base.service";

import { BookType, ReviewType } from '@/interfaces';
import { BookRepository } from "@/repository";

class BookService extends BaseService<BookType> {
  private readonly $auth: any
  static storeName: string = "book";

  constructor(context: Context) {
    super(context, new BookRepository(context), BookService.storeName)
    this.$auth = context.$auth;
  }

  async findWithAuthors(slug: string): Promise<BookType[]> {
    return await this.repository.findWithAuthors({ slug });
  }

  review(id: string) {
    const userId = this.$auth.loggedIn ? this.$auth.user._id : null;
    const reviews = this.store.state.book.books.find((x: BookType) => x._id === id)?.reviews ?? [] as ReviewType[];
    const user = reviews.find((x: ReviewType) => x.id === userId)?.rating;
    const sum = reviews.reduce((a: number, b: ReviewType) => a + (b.rating ?? 0), 0);
    const count = reviews.length;
    return { sum, count, user, ratio: count > 0 ? sum / count : 0 };
  }

  setReview(id: string, value: number) {
    const userId = this.$auth.loggedIn ? this.$auth.user._id : null;
    const reviews = this.store.state.book.books.find((x: BookType) => x._id === id)?.reviews?.filter((x: ReviewType) => x.id !== userId) ?? [] as ReviewType[];
    this.update({ _id: id, reviews: [{ id: userId, rating: value }, ...reviews] } as any);
  }

  filtered({ name }: any, page: number, count: number): { list: BookType[], count: number } {
    const from = (page - 1) * count;
    const to = from + count;
    const list = this.store.state.book.books.filter((x: BookType) =>
      name ? x.name ? x.name.toLowerCase().includes(name.toLowerCase()) : false : true
    ).sort((a: BookType, b: BookType) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1) as BookType[];
    return { list: list.slice(from, to) as BookType[], count: list.length };
  }
}

export { BookService }
