import { Context } from "@nuxt/types";
import BaseService from "./base.service";

import { BookType, ReviewType } from "@/interfaces";
import { BookRepository } from "@/repository";

class BookService extends BaseService<BookType> {
  static storeName: string = "book";

  constructor(context: Context) {
    super(context, new BookRepository(context), BookService.storeName);
  }

  async findWithAuthors(slug: string): Promise<BookType[]> {
    return await this.repository.findWithAuthors({ slug });
  }

  review(id: string) {
    const { userId } = this.store.state.user?.user ?? {};
    const reviews =
      this.store.state.book.books.find((x: BookType) => x._id === id)
        ?.reviews ?? ([] as ReviewType[]);
    const user = reviews.find((x: ReviewType) => x.id === userId)?.rating;
    const sum = reviews.reduce(
      (a: number, b: ReviewType) => a + (b.rating ?? 0),
      0
    );
    const count = reviews.length;
    return { sum, count, user, ratio: count > 0 ? sum / count : 0 };
  }

  setReview(id: string, value: number) {
    const { userId } = this.store.state.user?.user ?? {};
    const reviews =
      this.store.state.book.books
        .find((x: BookType) => x._id === id)
        ?.reviews?.filter((x: ReviewType) => x.id !== userId) ??
      ([] as ReviewType[]);
    this.update({
      _id: id,
      reviews: [{ id: userId, rating: value }, ...reviews],
    } as any);
  }

  filtered(
    { term }: any,
    page: number,
    count: number
  ): { list: BookType[]; count: number } {
    const from = (page - 1) * count;
    const to = from + count;
    const list = this.store.state.book.books
      .filter((x: BookType) =>
        term
          ? x.name
            ? x.name.toLowerCase().includes(term.toLowerCase())
            : false
          : true
      )
      .sort((a: BookType, b: BookType) =>
        a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
      ) as BookType[];
    return { list: list.slice(from, to) as BookType[], count: list.length };
  }
}

export { BookService };
