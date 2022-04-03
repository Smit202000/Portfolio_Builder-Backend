const joi = require('joi');
const errorFunction = require('../utils/errorFunction');

const validation = joi.object({
  firstName: joi.string().min(3).max(20).trim(true).required(),
  lastName: joi.string().trim(true).required(),
  userName: joi.string().min(3).max(20).trim(true).required(),
  email: joi.string().email().min(3).max(20).trim(true).required(),
  password: joi.string().trim(true).required(),
  haveOptedInForPortfolio: joi.boolean(),
});

const userValidation = async (req, res, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    haveOptedInForPortfolio: req.body.haveOptedInForPortfolio,
  };

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};
module.exports = userValidation;
