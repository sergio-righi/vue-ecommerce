import { Context } from '@nuxt/types'
import BaseService from "./base.service";

import { OrderModel } from "@/models";
import { OrderRepository } from "@/repository";
import { BookService } from "@/services/book";
import { BasketService } from "@/services/basket";
import { AddressType, BookType, ItemType, OrderType, PaymentType } from '@/interfaces';

class OrderService extends BaseService<OrderType> {
  private readonly bookService: BookService;
  private readonly basketService: BasketService;
  static storeName: string = "order";

  constructor(context: Context) {
    super(context, new OrderRepository(context), OrderService.storeName)
    this.bookService = new BookService(context);
    this.basketService = new BasketService(context);
  }

  async allWithBooks(id: string): Promise<OrderType[]> {
    return await this.repository.allWithBooks({ userId: id });
  }

  async insert(address: AddressType, payment: PaymentType) {
    const order = new OrderModel() as OrderType;
    order.books = this.store.state.basket.basket;
    order.address = address;
    order.payment = payment;
    order.userId = this.store.state.user.user._id;

    for (const item of order.books) {
      const book = this.store.state.book.books.find((x: BookType) => x._id === item.bookId);
      if (book) {
        this.bookService.update({ ...book, inStock: Math.max(0, book.inStock - item.count) })
      }
    }

    await this.create(order);
    this.basketService.reset();
  }
}

export { OrderService }