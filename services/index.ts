import { BasketService } from "./basket";
import { BookService } from "./book";
import { SessionService } from "./session";
import { UserService } from "./user";

export const initializeService = (store: any) => ({
  book: BookService(store),
  basket: BasketService(store),
  session: SessionService(store),
  user: UserService(store),
});
