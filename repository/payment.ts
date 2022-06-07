import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { PaymentModel } from '@/models';
import { PaymentType } from '@/interfaces';

class PaymentRepository extends BaseRepository<PaymentType> {
  static controllerName: string = "/payments";

  constructor(context: Context) {
    super(context, PaymentModel, PaymentRepository.controllerName)
  }
}

export { PaymentRepository }