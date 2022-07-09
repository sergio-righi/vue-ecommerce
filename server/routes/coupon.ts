import express from "express";
import { auth, validation } from "@/middlewares";
import { CouponsController } from "@/controllers";

const router = express.Router();

router.get("/", auth, (_, res) => CouponsController.all(res));
router.post("/", auth, (req, res) => CouponsController.create(res, req));
router.post("/one", auth, (req, res) => CouponsController.findOne(res, req));
router.put("/", auth, (req, res) => CouponsController.update(res, req));
router.patch("/soft/:id", validation, (req, res) =>
  CouponsController.soft(res, req)
);
router.patch("/restore/:id", validation, (req, res) =>
  CouponsController.restore(res, req)
);

export default router;
