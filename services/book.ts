import { Book, Review } from "@/models";

export const BookService = (store: any) => ({

  all() {
    if (store.state.book.books.length === 0) {
      store.dispatch("book/all");
    }
  },

  update(id: string, props: any) {
    store.dispatch("book/put", { id, props });
  },

  set(id: string, count: any) {
    store.dispatch("book/set", { id, count });
  },

  find(slug: string): Book {
    return store.state.book.books.find((x: Book) => x.slug === slug);
  },

  clear() {
    store.dispatch("book/clear");
  },

  reset() {
    store.dispatch("book/reset");
  },

  count(id: string) {
    return store.state.book.books.find((x: Book) => x.id === id)?.count ?? 1;
  },

  review(id: string) {
    const userId = store.state.user.user.id ?? "";
    const reviews = store.state.book.books.find((x: Book) => x.id === id)?.reviews ?? [] as Review[];
    const user = reviews.find((x: Review) => x.id === userId)?.rating;
    const sum = reviews.reduce((a: number, b: Review) => a + (b.rating ?? 0), 0);
    const count = reviews.length;
    return { sum, count, user, ratio: count > 0 ? sum / count : 0 };
  },

  setReview(id: string, value: number) {
    const userId = store.state.user.user.id;
    const reviews = store.state.book.books.find((x: Book) => x.id === id)?.reviews?.filter((x: Review) => x.id !== userId) ?? [] as Review[];
    this.update(id, { reviews: [{ id: userId, rating: value }, ...reviews] });
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
