const express = require("express")
const {
    signUpController,
} = require("../controllers/user.js")

router = express.Router()

router.post("/signup", signUpController)

// router.put('/updateUser', update)

// router.delete('/deleteUser',remove)

module.exports = router