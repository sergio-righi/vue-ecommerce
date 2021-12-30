import { BasketService } from "./basket";
import { OrderService } from "./order";
import { BookService } from "./book";
import { SessionService } from "./session";
import { UserService } from "./user";

export const initializeService = (store: any, i18n: any) => ({
  book: BookService(store),
  basket: BasketService(store, i18n),
  order: OrderService(store),
  session: SessionService(store),
  user: UserService(store),
});
