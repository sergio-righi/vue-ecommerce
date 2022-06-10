import express from "express";
import { validation } from '@server/middlewares';
import { TokensController } from "@server/controllers";

const router = express.Router();

router.post("/", (req, res) => TokensController.create(res, req));
router.post("/one", (req, res) => TokensController.findOne(res, req));
router.post("/many", (req, res) => TokensController.findMany(res, req));
router.put("/", (req, res) => TokensController.update(res, req));
router.patch("/done/:id", validation, (req, res) => TokensController.done(res, req));
router.patch("/undone/:id", validation, (req, res) => TokensController.undone(res, req));
router.patch("/reset/:id", validation, (req, res) => TokensController.reset(res, req));

export default router;
