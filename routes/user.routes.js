const express = require("express");
// const auth = require('../middleware/auth')
// const bcrypt = require("bcryptjs");
const router = new express.Router();
const { register, update, remove } = require("../controllers/user.controller");

router.post("/users/register", register);

router.patch("/users/me", update);

router.delete("/users/me", remove);

module.exports = router;
