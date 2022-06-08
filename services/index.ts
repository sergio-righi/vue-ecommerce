import { Context } from '@nuxt/types'

import { AuthorService } from "./author";
import { BasketService } from "./basket";
import { BookService } from "./book";
import { MailService } from "./mail";
import { OrderService } from "./order";
import { SessionService } from "./session";
import { TokenService } from "./token";
import { UserService } from "./user";

export const initializeService = (context: Context) => ({
  author: new AuthorService(context),
  book: new BookService(context),
  basket: new BasketService(context),
  mail: new MailService(context),
  order: new OrderService(context),
  session: new SessionService(context),
  token: new TokenService(context),
  user: new UserService(context),
});
