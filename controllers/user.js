const jwt = require("jsonwebtoken")
require("dotenv").config()
//const MyErrors = require("../utils/customError.js")
const User = require("../models/user.js")


const signUpController = async (req, res, next) => {
    //Creating Model instance from the request body
    let user = new User(req.body)
    try {
        user = await user.save()
        const {
            username,
            email,
            _id
        } = user

        res.status(201).json({
            username,
            email,
            _id
        })
    } catch (error) {
        next(error)
    }
}


const updateController = async (req, res,next) => {
   
    try {
        const user = req.user
        const updatedUser = await User.updateOne({
            _id: user._id
        }, {
            $set: req.body
        })
        res.json(updatedUser)
    } catch (error) {
        next(error)
    }
}

const removeController = async (req, res) => {
    try {
        const user = req.user
        await User.deleteOne(user);
        res.send("done");
    } catch (error) {
        next(error)
    }
};

module.exports = {
    signUpController,
    updateController,
    removeController,
}