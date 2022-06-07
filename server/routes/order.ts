import express from "express";
import { validation } from '@server/middleware';
import { OrdersController } from "@server/controllers";

const router = express.Router();

router.get("/", (_, res) => OrdersController.all(res));
router.get("/:id", validation, (req, res) => OrdersController.find(res, req));
router.post("/", (req, res) => OrdersController.create(res, req));
router.post("/one", (req, res) => OrdersController.findOne(res, req));
router.post("/many", (req, res) => OrdersController.findMany(res, req));
router.post("/all-with-books", (req, res) => OrdersController.allWithBooks(res, req));
router.post("/exists", (req, res) => OrdersController.exists(res, req));
router.put("/", (req, res) => OrdersController.update(res, req));
router.patch("/soft/:id", validation, (req, res) => OrdersController.soft(res, req));
router.patch("/restore/:id", validation, (req, res) => OrdersController.restore(res, req));

export default router;
