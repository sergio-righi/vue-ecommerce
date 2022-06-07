import express from "express";
import { MailsController } from "@server/controllers";

const router = express.Router();

router.post("/verification-code", (req, res) => MailsController.verificationCode(res, req));
router.post("/forget-password", (req, res) => MailsController.forgetPassword(res, req));

export default router;
