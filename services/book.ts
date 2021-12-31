import { Book } from "@/models";

export const BookService = (store: any) => ({

  all() {
    if (store.state.book.books.length === 0) {
      store.dispatch("book/fetchBooks");
    }
  },

  update(book: Book) {
    store.dispatch("book/putBook", book);
  },

  set(id: string, count: any) {
    store.dispatch("book/setBook", { id, count });
  },

  find(id: string): Book {
    store.dispatch("book/fetchBook", id);
    return store.state.book.book;
  },

  findBySlug(slug: string): Book {
    store.dispatch("book/fetchBookSlug", slug);
    return store.state.book.book;
  },

  reset() {
    store.dispatch("book/clearBooks");
  },

  clear() {
    store.dispatch("book/clearBook");
  },

  filtered({ name }: any, page: number, count: number): { list: Book[], count: number } {
    const from = (page - 1) * count;
    const to = from + count;
    const list = store.state.book.books.filter((x: Book) =>
      name ? x.name ? x.name.toLowerCase().includes(name.toLowerCase()) : false : true
    ).sort((a: Book, b: Book) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1) as Book[];
    return { list: list.slice(from, to) as Book[], count: list.length };
  }

});
