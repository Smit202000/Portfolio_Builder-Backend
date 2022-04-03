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
  resetPasswordPOST,
  resetPasswordSet
} = require('../controllers/user.controller');

router = express.Router();

router.post('/signup', userValidation, signUpController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.post('/refresh-access', refreshAccessToken);

// router.put('/updateUser', update)
router.put('/updateUser', auth, updateUserController);

router.delete('/deleteUser', auth, deleteUserController);

//This is for password resetting routes
router.post("/password/reset", resetPasswordPOST)
router.post("/password/reset/:token", resetPasswordSet)

module.exports = router;
