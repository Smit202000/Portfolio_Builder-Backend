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


// const update = async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["first_name", "last_name", "user_name", "password", "email", "have_opted_in_for_portfolio"];
//     const isValidOperation = updates.every((update) =>
//         allowedUpdates.includes(update)
//     );

//     if (!isValidOperation) {
//         return res.status(400).send({
//             error: "Invalid updates!",
//         });
//     }

//     try {
//         updates.forEach((update) => (req.userModel[update] = req.body[update]));
//         await req.userModel.save();
//         res.send(req.userModel);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// };

// const remove = async (req, res) => {
//     try {
//         await req.userModel.remove();
//         res.send(req.userModel);
//     } catch (e) {
//         res.status(500).send();
//     }
// };

module.exports = {
    loginController,
    signUpController,
    refreshAccessToken,
    logoutController,
}