import { Address, Book, Item, Payment, Order } from "@/models";

export const OrderService = (store: any) => ({

  all() {
    const books = store.state.book.books;
    return store.state.order.orders.map((order: Order) => {
      return {
        ...order, books: order.books.map((item: Item) => {
          return { ...books.find((x: Book) => x.id === item.bookId), ...item };
        })
      };
    });
  },

  add(address: Address, payment: Payment) {
    const order = new Order();
    order.books = store.state.basket.basket;
    order.address = address;
    order.payment = payment;
    order.userId = store.state.session.user.id;

    for (const item of order.books) {
      const book = store.state.book.books.find((x: Book) => x.id === item.bookId);
      if (book) {
        store.dispatch("book/put", { ...book, inStock: Math.max(0, book.inStock - item.count) });
      }
    }

    store.dispatch("order/add", order);
    store.dispatch("basket/reset");
  },

  reset() {
    store.dispatch("order/reset");
  },

});
