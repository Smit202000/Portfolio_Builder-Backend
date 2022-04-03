<<<<<<< HEAD
const express = require('express');
const auth = require('../middlewares/auth');

const userValidation = require('../validator/userValidator');
const {
  loginController,
  logoutController,
  refreshAccessToken,
  signUpController,
  updateUserController,
  deleteUserController,
} = require('../controllers/user.controller');

router = express.Router();

router.post('/signup', userValidation, signUpController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.post('/refresh-access', refreshAccessToken);

// router.put('/updateUser', update)
router.put('/updateUser', auth, updateUserController);

router.delete('/deleteUser', auth, deleteUserController);

module.exports = router;
=======
const express = require("express")
const { loginController, logoutController, refreshAccessToken } = require("../controllers/user.js")

router = express.Router()

router.post("/login", loginController)

router.post("/logout", logoutController)


router.post("/refresh-access", refreshAccessToken)
module.exports = router
>>>>>>> origin/development
