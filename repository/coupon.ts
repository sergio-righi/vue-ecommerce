import { Context } from '@nuxt/types'
import BaseRepository from "./base.repository";

import { CouponModel } from '@/models';
import { CouponType } from '@/interfaces';

class CouponRepository extends BaseRepository<CouponType> {
  static controllerName: string = "/coupons";

  constructor(context: Context) {
    super(context, CouponModel, CouponRepository.controllerName)
  }
}

export { CouponRepository }