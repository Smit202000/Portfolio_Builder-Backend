const express = require("express");
const {
  signUpController,
  updateController,
  removeController,
} = require("../controllers/user.js");

router = express.Router();

router.post("/signup", signUpController);

router.put("/updateUser", updateController);

router.delete("/deleteUser", removeController);

module.exports = router;
