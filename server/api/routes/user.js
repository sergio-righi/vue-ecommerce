const express = require("express");
const router = express.Router();
const userController = require("../controller/usersController");

router.get("/", userController.all);
router.get("/:id", userController.find);
router.get("/email/:email", userController.findByEmail);
router.post("/", userController.insert);
router.post("/login", userController.login);
router.post("/exists", userController.exists);
router.put("/:id", userController.update);
router.patch("/delete/:id", userController.delete);
router.patch("/recover/:id", userController.recover);
router.patch("/lock/:id", userController.lock);
router.patch("/release/:id", userController.release);

module.exports = router;
