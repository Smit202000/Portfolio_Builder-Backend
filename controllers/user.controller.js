const jwt = require('jsonwebtoken');
require('dotenv').config();
const MyErrors = require('../utils/customError.js');
const User = require('../models/user.js');
const mail = require('../utils/mail');
let success = true;
const loginController = async (req, res, next) => {
  let { email, password } = req.body;
  if (email && password) {
    //Finding User
    let user = await User.findOne({ email });
    if (!user) {
      return next(MyErrors.notFound({ message: 'User Not Found' }));
    }

    let isMatched = await user.checkPassword(password);
    if (!isMatched) {
      return next(
        MyErrors.unAuthorized({
          message: 'Invalid Password',
        })
      );
    }

    //Generating Access and Refresh Token
    let accessToken = user.getToken({
      exp: 60 * 60 * 24,
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    let refreshToken = user.getToken({
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    //Updating User with Refresh Token
    user.refreshToken = refreshToken;
    await user.save();
    return res.status(200).send({
      success,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      },
    });
  } else {
    next(
      MyErrors.unAuthorized({
        message: 'Please Provide Credentials',
      })
    );
  }
};

const logoutController = async (req, res, next) => {
  const { refresh_token, access_token } = req.body;
  try {
    const data = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

    let user = await User.findOne({ _id: data.id });
    if (!user) {
      return next(MyErrors.notFound({ message: 'User Not Found' }));
    }
    if (!user.refreshToken) {
      return next(
        MyErrors.unAuthorized({
          message: 'Please Login to Access this End Point',
        })
      );
    }
    if (user.refreshToken !== refresh_token) {
      return next(MyErrors.unAuthorized({ message: 'Invalid Refresh Token' }));
    }
    user.blackList.push(access_token);
    //Deleting The Field refreshToken From User
    user.refreshToken = undefined;
    await user.save();
    res.status(200).json({
      success,
      message: 'Logged out',
    });
  } catch (error) {
    return next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  const { refresh_token } = req.body;
  try {
    const data = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    let user = await User.findOne({ _id: data.id });
    if (!user) {
      return next(MyErrors.notFound({ message: 'User Not Found' }));
    }
    if (user.refreshToken !== refresh_token) {
      return next(MyErrors.unAuthorized({ message: 'Invalid Refresh Token' }));
    }
    let accessToken = user.getToken({
      exp: 60 * 60,
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    res.status(200).json({ success, data: { accessToken: accessToken } });
  } catch (error) {
    return next(MyErrors.unAuthorized({ message: 'Invalid Refresh Token' }));
  }
};

const signUpController = async (req, res, next) => {
  const userDataByEmail = await User.findOne({ email: req.body.email });
  const userDataByUserName = await User.findOne({
    userName: req.body.userName,
  });
  if (userDataByEmail) {
    return res.status(500).json({
      success: false,
      message: 'Email id already exists.',
    });
  }
  if (userDataByUserName) {
    return res.status(500).json({
      success: false,
      message: 'Username already exists.',
    });
  }

  try {
    const user = new User(req.body);
    const result = await user.save();
    // const { username, email, _id } = user;

    return res.status(200).json({
      success,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  if (req.body.email || req.body.userName) {
    const userDataByEmail = await User.findOne({ email: req.body.email });
    const userDataByUserName = await User.findOne({
      userName: req.body.userName,
    });
    if (userDataByEmail) {
      return res
        .status(422)
        .json({ success: false, message: 'Email id already exists.' });
    }
    if (userDataByUserName) {
      return res
        .status(422)
        .json({ success: false, message: 'Username already exists.' });
    }
  }

  try {
    const user = req.user;
    for (key in req.body) {
      user[key] = req.body[key];
    }
    const updatedUser = await user.save();
    res.status(200).json({
      success,
      data: updatedUser,
      message: 'User updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const user = req.user;
    await User.deleteOne(user);
    res.status(200).json({ success, message: 'User Deleted Successfully' });
  } catch (error) {
    next(error);
  }
};
const resetPasswordPOST = async (req, res, next) => {
  const { email } = req.body;
  try {
    const u = await User.findOne({ email });
    if (!u) {
      next(
        MyErrors.notFound({
          message: 'User not found',
        })
      );
    }
    const token = jwt.sign({ id: u._id }, process.env.RESET_TOKEN_SECRET, {
      // This time is in second
      expiresIn: 60 * 60,
    });

    //creating the reset link
    const link = 'http://' + req.get('host') + '/user/password/reset/' + token;
    await mail(
      email,
      link,
      'Forgot Password',
      'Hello from Portfolio',
      `Here is a password reset Link ${link}`
    );
    res
      .status(201)
      .json({ message: 'Password reset link is sent to your email', token });
  } catch (error) {
    return next(error);
  }
};

const resetPasswordSet = async (req, res, next) => {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const userId = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const user = await User.findOne({ _id: userId.id });
    user.password = password;
    await user.save();

    res.json({ message: 'Password reseted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginController,
  logoutController,
  refreshAccessToken,
  signUpController,
  updateUserController,
  deleteUserController,
  resetPasswordPOST,
  resetPasswordSet,
};
