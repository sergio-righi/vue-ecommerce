import express from "express";
import { validation } from '@server/middleware';
import { BooksController } from "@server/controllers";

const router = express.Router();

router.get("/", (_, res) => BooksController.all(res));
router.get("/:id", validation, (req, res) => BooksController.find(res, req));
router.post("/", (req, res) => BooksController.create(res, req));
router.post("/one", (req, res) => BooksController.findOne(res, req));
router.post("/find-with-authors", (req, res) => BooksController.findWithAuthors(res, req));
router.post("/exists", (req, res) => BooksController.exists(res, req));
router.put("/", (req, res) => BooksController.update(res, req));
router.patch("/soft/:id", validation, (req, res) => BooksController.soft(res, req));
router.patch("/restore/:id", validation, (req, res) => BooksController.restore(res, req));

export default router;
