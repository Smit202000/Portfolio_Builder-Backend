const express = require("express")
const { loginController, logoutController, refreshAccessToken } = require("../controllers/user.js")

router = express.Router()

router.post("/login", loginController)

router.post("/logout", logoutController)


router.post("/refresh-access", refreshAccessToken)
module.exports = router