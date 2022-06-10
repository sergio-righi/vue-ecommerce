import { CouponModel } from "@server/models";
import { BaseController } from "./base.controller";

class CouponsController extends BaseController {
  constructor() {
    super(CouponModel);
  }
}

export default new CouponsController();