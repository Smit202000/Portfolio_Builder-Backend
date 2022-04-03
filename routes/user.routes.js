<<<<<<< HEAD
const express = require("express");

=======
const express = require('express');
const auth = require('../middlewares/auth');

const userValidation = require('../validator/userValidator');
>>>>>>> 030f7c6369616baf9d16cd5dbc96a1bfd2ce8abc
const {
  loginController,
  logoutController,
  refreshAccessToken,
<<<<<<< HEAD
  updateController,
  removeController,
  signUpController,
} = require("../controllers/user.js");

router = express.Router();

router.post("/signup", signUpController);

router.put("/updateUser", updateController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/refresh-access", refreshAccessToken);

// router.put('/updateUser', update)

router.delete("/deleteUser", removeController);
=======
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
>>>>>>> 030f7c6369616baf9d16cd5dbc96a1bfd2ce8abc

module.exports = router;
