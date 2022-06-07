import express from "express";
import { validation } from '@server/middleware';
import { UsersController } from "@server/controllers";

const router = express.Router();

router.get("/", (_, res) => UsersController.all(res));
router.get("/:id", validation, (req, res) => UsersController.find(res, req));
router.post("/", (req, res) => UsersController.create(res, req));
router.post("/one", (req, res) => UsersController.findOne(res, req));
router.post("/exists", (req, res) => UsersController.exists(res, req));
router.put("/", (req, res) => UsersController.update(res, req));
router.patch("/soft/:id", validation, (req, res) => UsersController.soft(res, req));
router.patch("/restore/:id", validation, (req, res) => UsersController.restore(res, req));

export default router;
