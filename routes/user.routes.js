const express = require("express")

const { loginController, logoutController, refreshAccessToken, signUpController } = require("../controllers/user.js")

router = express.Router()

router.post("/signup", signUpController)

router.post("/login", loginController)

router.post("/logout", logoutController)

router.post("/refresh-access", refreshAccessToken)

// router.put('/updateUser', update)

// router.delete('/deleteUser',remove)

module.exports = router