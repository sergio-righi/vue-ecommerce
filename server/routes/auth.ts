import express from "express";
import { jwt } from "@server/middlewares";
import { AuthController } from "@server/controllers";

const router = express.Router();

router.get('/user', jwt, (_, res) => AuthController.me(res));
router.post('/login', (req, res) => AuthController.login(res, req));
router.post('/refresh', (req, res) => AuthController.refresh(res, req));

export default router;
