import express from "express";
import { validation } from '@server/middleware';
import { AuthorsController } from "@server/controllers";

const router = express.Router();

router.get("/", (_, res) => AuthorsController.all(res));
router.get("/:id", validation, (req, res) => AuthorsController.find(res, req));
router.post("/", (req, res) => AuthorsController.create(res, req));
router.post("/one", (req, res) => AuthorsController.findOne(res, req));
router.post("/exists", (req, res) => AuthorsController.exists(res, req));
router.put("/", (req, res) => AuthorsController.update(res, req));
router.patch("/soft/:id", validation, (req, res) => AuthorsController.soft(res, req));
router.patch("/restore/:id", validation, (req, res) => AuthorsController.restore(res, req));

export default router;
