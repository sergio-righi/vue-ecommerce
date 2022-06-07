import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { OrderModel } from '@/models';
import { OrderType } from '@/interfaces';

class OrderRepository extends BaseRepository<OrderType> {
  static controllerName: string = "/orders";

  constructor(context: Context) {
    super(context, OrderModel, OrderRepository.controllerName)
  }

  async allWithBooks(options: any): Promise<any> {
    const response = await this.context.$axios.post(`${OrderRepository.controllerName}/all-with-books`, options);
    return response.data ? response.data.map((item: any) => new OrderModel(item)) : [];
  }
}

export { OrderRepository }