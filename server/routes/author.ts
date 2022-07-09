import express from "express";
import { auth, validation } from "@/middlewares";
import { AuthorsController } from "@/controllers";

const router = express.Router();

router.get("/", auth, (_, res) => AuthorsController.all(res));
router.get("/:id", validation, (req, res) => AuthorsController.find(res, req));
router.post("/", auth, (req, res) => AuthorsController.create(res, req));
router.put("/", auth, (req, res) => AuthorsController.update(res, req));
router.patch("/soft/:id", validation, (req, res) =>
  AuthorsController.soft(res, req)
);
router.patch("/restore/:id", validation, (req, res) =>
  AuthorsController.restore(res, req)
);

export default router;
