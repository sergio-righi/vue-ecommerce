import express from "express";
import { auth, validation } from "@/middlewares";
import { BooksController } from "@/controllers";

const router = express.Router();

router.get("/", auth, (_, res) => BooksController.all(res));
router.get("/:id", validation, (req, res) => BooksController.find(res, req));
router.post("/", auth, (req, res) => BooksController.create(res, req));
router.post("/find-with-authors", auth, (req, res) =>
  BooksController.findWithAuthors(res, req)
);
router.put("/", auth, (req, res) => BooksController.update(res, req));
router.patch("/soft/:id", validation, (req, res) =>
  BooksController.soft(res, req)
);
router.patch("/restore/:id", validation, (req, res) =>
  BooksController.restore(res, req)
);

export default router;
