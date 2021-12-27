const express = require("express");
const router = express.Router();
const tokenController = require("../controller/tokensController");

router.get("/user/:id", tokenController.findByUser);
router.get("/code/:code", tokenController.findByCode);
router.get("/token/:token", tokenController.findByToken);
router.post("/", tokenController.insert);
router.put("/:id", tokenController.update);
router.patch("/done/:id", tokenController.done);

module.exports = router;
