import { Book, Item } from "@/models";
import { calculation } from "@/utils";

export const BasketService = (store: any, i18n: any) => ({

  all() {
    store.dispatch("basket/fetchBasket");
  },

  find(id: string) {
    store.dispatch("basket/fetchItem", id);
  },

  insert(id: string, count: number) {
    store.dispatch("basket/addItem", { id, count });
  },

  set(id: string, count: number) {
    store.dispatch("basket/setItem", { id, count });
  },

  update(item: Item) {
    store.dispatch("basket/putItem", item);
  },

  delete(id: string) {
    store.dispatch("basket/deleteItem", id);
  },

  recover() {
    store.dispatch("basket/recoverItem");
  },

  reset() {
    store.dispatch("basket/clearBasket");
  },

  validate() {
    const books = store.state.book.books;
    for (const item of store.state.basket.basket) {
      const book = books.find((x: Book) => x.id === item.bookId);
      if (book) {
        if (book.inStock === 0) {
          this.delete(book.id);
        } else {
          this.update({ ...item, count: Math.min(book.inStock, item.count), price: book.price, discount: book.discount })
        }
      }
    }
    return true;
  },

  list() {
    const books = store.state.book.books;
    return store.state.basket.basket.map((item: Item) => {
      const book = books.find((x: Book) => x.id === item.bookId);
      return book ? { ...item, book: book } : null;
    }).filter((x: any) => x);
  },

  tax() {
    return `${calculation.HST * 100}%`;
  },

  subtotal() {
    return this.list().reduce(
      (a: number, b: any) =>
        a + calculation.regularPrice(b.book.price, i18n, b.count),
      0
    );
  },

  total() {
    return this.list().reduce(
      (a: number, b: any) =>
        a +
        calculation.reducedPrice(
          calculation.regularPrice(b.book.price, i18n, b.count),
          b.book.discount
        ),
      0
    );
  },

  taxed() {
    return calculation.applyTax(this.total());
  },

});
