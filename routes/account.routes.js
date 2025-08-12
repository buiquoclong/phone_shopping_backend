const express = require('express');
const router = express.Router();
const accountController = require("../controllers/account.controller")

router.get("/", accountController.getAllAccount);
router.get("/:id", accountController.getAccountById);
router.post("/", accountController.createAccount);
router.put("/:id", accountController.updateAccount);
router.put("/change_password/:id", accountController.changePassword);
router.put("/reset_password/:id", accountController.resetPassword);
router.delete("/:id", accountController.deleteAccount);

module.exports = router;