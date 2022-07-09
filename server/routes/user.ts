import express from "express";
import { auth } from "@/middlewares";
import { UsersController } from "@/controllers";

const router = express.Router();

router.post("/", auth, (req, res) => UsersController.add(res, req));
router.post("/one", auth, (req, res) => UsersController.get(res, req));
router.put("/", auth, (req, res) => UsersController.edit(res, req));

export default router;
