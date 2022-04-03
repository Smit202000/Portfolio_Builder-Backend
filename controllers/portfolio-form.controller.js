const { json } = require('express/lib/response');
const portfolioModel = require('../models/portfolio-form');
const userModel = require('../models/user');

let success = true;

const createPortfolio = async (req, res) => {
    const portfolio = new portfolioModel({
        ...req.body,
        user: req.user._id
    });
    try {
        await portfolio.save();
        res.status(201).json({
            success,
            data: portfolio
        });
    } catch (error) {
        res.status(404).json({
            error,
            success: false
        });
    }
}

const getPortfolioByUsername = async (req, res) => {
    try {
        const portfolio = await portfolioModel.findOne({ user: req.user._id });
        const { first_name, last_name, user_name, email } = await userModel.findOne({_id: req.user._id });
        
        if (portfolio)
            return res.status(200).json({
                success,
                data: {
                    first_name,
                    last_name,
                    user_name,
                    email,
                    portfolio,
                }
            });
        
            res.status(404).json({
            message: "Portfolio not created for user",
            success: false
        });
    } catch (error) {
        res.status(500).json({
            error,
            success: false
        });
    }
}

const updatePortfolio = async (req, res, next) => {

    try {
        const user = req.user
        
        portfolioModel.updateOne({
            user: user._id
        }, {
            $set: req.body
        }, { new: true }, (error, data) => {
            if (error) console.log(error)
            if(!data){
                return res.status(404).json({
                    success: false,
                    message:"Portfolio not found"
                })
            }
            console.log(data);
            res.json({
                data,
                success
            });
        });
    } catch (error) {
        next(error)
    }
}


const deletePortfolio = async (req, res, next) => {
    try {
        const user = req.user
        const deletedPortfolio = await portfolioModel.deleteOne({
            user: user._id
        })
        if(!deletedPortfolio){
            return res.status(404).json({
                success: false,
                message:"Portfolio not found"
            })
        }
        res.json({
            data: deletedPortfolio,
            success
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioByUsername
}