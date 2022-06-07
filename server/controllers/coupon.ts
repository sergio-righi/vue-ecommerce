import { CouponModel } from "@server/models";
import { CouponService } from "@server/services";
import { BaseController } from "./base.controller";

class CouponsController extends BaseController {
  constructor() {
    super(new CouponModel());
  }
}

export default new CouponsController();