import express from "express";
import { validation } from '@server/middleware';
import { CouponsController } from "@server/controllers";

const router = express.Router();

router.get("/", (_, res) => CouponsController.all(res));
router.get("/:id", validation, (req, res) => CouponsController.find(res, req));
router.post("/", (req, res) => CouponsController.create(res, req));
router.post("/one", (req, res) => CouponsController.findOne(res, req));
router.post("/exists", (req, res) => CouponsController.exists(res, req));
router.put("/", (req, res) => CouponsController.update(res, req));
router.patch("/soft/:id", validation, (req, res) => CouponsController.soft(res, req));
router.patch("/restore/:id", validation, (req, res) => CouponsController.restore(res, req));

export default router;
