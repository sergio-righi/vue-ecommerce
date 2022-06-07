import express from "express";
import { validation } from '@server/middleware';
import { PaymentsController } from "@server/controllers";

const router = express.Router();

router.get("/", (_, res) => PaymentsController.all(res));
router.get("/:id", validation, (req, res) => PaymentsController.find(res, req));
router.post("/", (req, res) => PaymentsController.create(res, req));
router.post("/one", (req, res) => PaymentsController.findOne(res, req));
router.post("/exists", (req, res) => PaymentsController.exists(res, req));
router.put("/", (req, res) => PaymentsController.update(res, req));
router.patch("/soft/:id", validation, (req, res) => PaymentsController.soft(res, req));
router.patch("/restore/:id", validation, (req, res) => PaymentsController.restore(res, req));

export default router;
