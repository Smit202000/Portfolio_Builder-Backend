const jwt = require("jsonwebtoken")
require("dotenv").config()
const MyErrors = require("../utils/customError.js")
const User = require("../models/user.js")

const loginController = async (req, res, next) => {
    let { email, password } = req.body
    if (email && password) {
        //Finding User
        let user = await User.findOne({ email })
        if (!user) {
            return next(MyErrors.notFound({ message: "User Not Found" }))
        }

        let isMatched = await user.checkPassword(password)
        if (!isMatched) {
            return next(MyErrors.unAuthorized({
                message: "Invalid Password"
            }))
        }

        //Generating Access and Refresh Token
        let accessToken = user.getToken({ exp: 60 * 60 * 24, secret: process.env.ACCESS_TOKEN_SECRET })
        let refreshToken = user.getToken({ secret: process.env.REFRESH_TOKEN_SECRET })
        //Updating User with Refresh Token
        user.refreshToken = refreshToken
        await user.save()
        return res.status(200).send({ accessToken, refreshToken })
    }

    else {
        next(MyErrors.unAuthorized({
            message: "Please Provide Credentials"
        }))
    }
}


const logoutController = async (req, res, next) => {
    const { refresh_token, access_token } = req.body
    try {
        const data = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)

        let user = await User.findOne({ _id: data.id })
        if (!user) {
            return next(MyErrors.notFound({ message: "User Not Found" }))
        }
        if (!user.refreshToken) {
            return next(MyErrors.unAuthorized({
                message: "Please Login to Access this End Point"
            }))
        }
        if (user.refreshToken !== refresh_token) {
            return next(MyErrors.unAuthorized({ message: "Invalid Refresh Token" }))
        }
        user.blackList.push(access_token)
        //Deleting The Field refreshToken From User
        user.refreshToken = undefined
        await user.save()
        res.status(200).json({
            message: "Logged out"
        })
    } catch (error) {
        return next(error)
    }

}

const refreshAccessToken = async (req, res, next) => {
    const { refresh_token } = req.body
    try {
        const data = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        let user = await User.findOne({ _id: data.id })
        if (!user) {
            return next(MyErrors.notFound({ message: "User Not Found" }))
        }
        if (user.refreshToken !== refresh_token) {
            return next(MyErrors.unAuthorized({ message: "Invalid Refresh Token" }))
        }
        let accessToken = user.getToken({ exp: 60 * 60, secret: process.env.ACCESS_TOKEN_SECRET })
        res.status(200).json({ accessToken })
    } catch (error) {
        return next(MyErrors.unAuthorized({ message: "Invalid Refresh Token" }))
    }


}

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