import { Context } from '@nuxt/types'

import { calculation } from "@/utils";
import { BookType, ItemType } from '@/interfaces';

class BasketService {
  private readonly i18n: any
  private readonly store: any
  static storeName: string = "basket";

  constructor({ store, i18n }: Context) {
    this.i18n = i18n;
    this.store = store;
  }

  all() {
    this.store.dispatch(`${BasketService.storeName}/all`);
  }

  insert(id: string, count: number) {
    this.store.dispatch(`${BasketService.storeName}/add`, { id, count });
  }

  set(id: string, count: number) {
    this.store.dispatch(`${BasketService.storeName}/set`, { id, count });
  }

  update(item: ItemType) {
    this.store.dispatch(`${BasketService.storeName}/put`, item);
  }

  delete(id: string) {
    this.store.dispatch(`${BasketService.storeName}/delete`, id);
  }

  restore() {
    this.store.dispatch(`${BasketService.storeName}/restore`);
  }

  clear() {
    this.store.dispatch(`${BasketService.storeName}/clear`);
  }

  reset() {
    this.store.dispatch(`${BasketService.storeName}/reset`);
  }

  count(id: string) {
    return this.store.state.basket.basket.find((x: ItemType) => x.bookId === id)?.count ?? 1;
  }

  exist(id: string): boolean {
    return this.store.state.basket.basket.find((x: ItemType) => x.bookId === id) !== undefined;
  }

  validate(): boolean {
    const books = this.store.state.book.books;
    for (const item of this.store.state.basket.basket) {
      const book = books.find((x: BookType) => x._id === item.bookId);
      if (book) {
        if (book.inStock === 0) {
          this.delete(book.id);
        } else {
          this.update({ ...item, count: Math.min(book.inStock, item.count), price: book.price, discount: book.discount })
        }
      }
    }
    return true;
  }

  list() {
    const books = this.store.state.book.books;
    return this.store.state.basket.basket.map((item: ItemType) => {
      const book = books.find((x: BookType) => x._id === item.bookId);
      return book ? { ...book, ...item } : null;
    }).filter((x: any) => x);
  }

  tax() {
    return `${calculation.HST * 100}%`;
  }

  subtotal() {
    return this.list().reduce(
      (a: number, b: any) =>
        a + calculation.regularPrice(b.price, this.i18n, b.count),
      0
    );
  }

  total() {
    return this.list().reduce(
      (a: number, b: any) =>
        a +
        calculation.reducedPrice(
          calculation.regularPrice(b.price, this.i18n, b.count),
          b.discount
        ),
      0
    );
  }

  taxed() {
    return calculation.applyTax(this.total());
  }
}

export { BasketService }