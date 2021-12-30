import { Book } from "@/models";

export const BookService = (store: any) => ({

  all() {
    store.dispatch("book/fetchBooks");
  },

  update(book: Book) {
    store.dispatch("book/putBook", book);
  },

  set(id: string, count: any) {
    store.dispatch("book/setBook", { id, count });
  },

  find(id: string) {
    store.dispatch("book/fetchBook", id);
  },

  findBySlug(slug: string) {
    store.dispatch("book/fetchBookSlug", slug);
  },

  reset() {
    store.dispatch("book/clearBooks");
  },

  clear() {
    store.dispatch("book/clearBook");
  },

  filtered({ name }: any, page: number, count: number): Book[] {
    const from = (page - 1) * count;
    const to = from + count;
    return store.state.book.books.filter((x: Book) =>
      name ? x.name ? x.name.toLowerCase().includes(name.toLowerCase()) : false : true
    ).slice(from, to) as Book[];
  }

});
