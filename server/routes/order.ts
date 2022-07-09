import express from "express";
import { auth, validation } from "@/middlewares";
import { OrdersController } from "@/controllers";

const router = express.Router();

router.get("/:id", validation, (req, res) => OrdersController.find(res, req));
router.post("/", auth, (req, res) => OrdersController.add(res, req));
router.post("/all-with-books", auth, (req, res) =>
  OrdersController.allWithBooks(res, req)
);
router.put("/", auth, (req, res) => OrdersController.update(res, req));
router.patch("/soft/:id", validation, (req, res) =>
  OrdersController.soft(res, req)
);
router.patch("/restore/:id", validation, (req, res) =>
  OrdersController.restore(res, req)
);

export default router;
