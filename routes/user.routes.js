const express = require("express");

const {
  loginController,
  logoutController,
  refreshAccessToken,
  updateController,
  removeController,
  signUpController,
  verifyEmail,
  resetPasswordPOST,
  resetPasswordSet
} = require("../controllers/user.js");

router = express.Router();

router.post("/signup", signUpController);

router.put("/updateUser", updateController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/refresh-access", refreshAccessToken);

router.get("/verify-email/:token", verifyEmail)

router.post("/password/reset", resetPasswordPOST)
router.post("/password/reset/:token", resetPasswordSet)
// router.put('/updateUser', update)

router.delete("/deleteUser", removeController);

module.exports = router;
