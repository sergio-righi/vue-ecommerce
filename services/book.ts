import { Book } from "@/models";

export const BookService = (store: any) => ({

  all() {
    store.dispatch("book/fetchBooks");
  },

  set(id: string, book: Book) {
    store.commit("book/setBook", { id, book });
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

  filtered({ name }: any, page: number, count: number) {
    const from = (page - 1) * count;
    const to = from + count;
    return store.state.book.books.filter((x: Book) =>
      name ? x.name ? x.name.toLowerCase().includes(name.toLowerCase()) : false : true
    ).slice(from, to);
  }

});
