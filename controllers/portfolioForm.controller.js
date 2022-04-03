const { json } = require('express/lib/response');
const portfolioModel = require('../models/portfolioForm');
const userModel = require('../models/user');

let success = true;

const createPortfolio = async (req, res) => {
  // if(req.user._id.toString()===)
  // console.log(req.user._id, 'rui');
  const existingPortfolio = await portfolioModel.findOne({
    user: req.user._id,
  });
  // console.log(existingPortfolio, 'exp');
  if (existingPortfolio) {
    return res.status(422).json({
      success: false,
      message: 'Portfolio already exists for this user',
    });
  }
  const portfolio = new portfolioModel({
    ...req.body,
    user: req.user._id,
  });
  try {
    await portfolio.save();
    res.status(200).json({
      success,
      data: portfolio,
    });
  } catch (error) {
    res.status(404).json({
      error,
      success: false,
    });
  }
};

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findOne({ user: req.user._id });
    const { firstName, lastName, userName, email } = await userModel.findOne({
      _id: req.user._id,
    });

    if (portfolio)
      return res.status(200).json({
        success,
        data: {
          firstName,
          lastName,
          userName,
          email,
          portfolio,
        },
      });

    res.status(404).json({
      message: 'Portfolio not created for user',
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
  }
};

const getPortfolioByUsername = async (req, res) => {
  const username = req.params.username;
  try {
    // const userPortfolioData = await portfolioModel.findOne().populate('user');
    // // console.log(data);
    // if (userPortfolioData) {
    //   res.status(200).json({
    //     message: 'Portfolio fetched successfully!',
    //     success: true,
    //     data: userPortfolioData,
    //   });
    // } else {
    //   res.status(404).json({
    //     message: 'Could not find portfolio for given username!',
    //     success: false,
    //   });
    // }
    const userData = await userModel.findOne({ userName: username });
    // console.log(userData);
    // const portfolio = await portfolioModel.findOne({ user: username });
    // if (portfolio)
    //   return res.status(200).json({
    //     success,
    //     data: {
    //       portfolio,
    //     },
    //   });
    if (!userData) {
      return res.status(404).json({
        message: 'Could not find user for the given username',
        success: false,
      });
    }
    const portfolioData = await portfolioModel.findOne({ user: userData._id });
    if (!portfolioData) {
      return res.status(404).json({
        message: 'Could not find portfolio for given username!',
        success: false,
      });
    }
    // console.log(portfolioData);

    res.status(200).json({
      message: 'Portfolio fetched successfully!',
      success: true,
      data: {
        portfolioData,
        userData,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const user = req.user;
    const updatedPortfolio = await portfolioModel.updateOne(
      {
        user: user._id,
      },
      {
        $set: req.body,
      }
    );
    console.log(updatePortfolio);
    if (!updatedPortfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }
    res.json({
      data: updatedPortfolio,
      success,
    });
  } catch (error) {
    next(error);
  }
};

const deletePortfolio = async (req, res, next) => {
  try {
    const user = req.user;
    const deletedPortfolio = await portfolioModel.deleteOne({
      user: user._id,
    });
    if (!deletedPortfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }
    res.json({
      data: deletedPortfolio,
      success,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolio,
  getPortfolioByUsername,
};
