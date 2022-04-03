const express = require("express")


const {
  loginController,
  logoutController,
  refreshAccessToken,
  signUpController,
  updateController,
  removeController,
} = require("../controllers/user.js");

router = express.Router();

router.post("/signup", signUpController);

router.post("/login", loginController)

router.post("/logout", logoutController)

router.post("/refresh-access", refreshAccessToken)

// router.put('/updateUser', update)
router.put("/updateUser", updateController);

router.delete("/deleteUser", removeController);

module.exports = router;
