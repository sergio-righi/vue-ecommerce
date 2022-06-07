import { PaymentModel } from "@server/models";
import { PaymentService } from "@server/services";
import { BaseController } from "./base.controller";

class PaymentsController extends BaseController {
  constructor() {
    super(new PaymentModel());
  }
}

export default new PaymentsController();