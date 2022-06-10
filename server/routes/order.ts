import express from "express";
import { validation } from '@server/middlewares';
import { OrdersController } from "@server/controllers";

const router = express.Router();

router.get("/:id", validation, (req, res) => OrdersController.find(res, req));
router.post("/", (req, res) => OrdersController.create(res, req));
router.post("/all-with-books", (req, res) => OrdersController.allWithBooks(res, req));
router.put("/", (req, res) => OrdersController.update(res, req));
router.patch("/soft/:id", validation, (req, res) => OrdersController.soft(res, req));
router.patch("/restore/:id", validation, (req, res) => OrdersController.restore(res, req));

export default router;
