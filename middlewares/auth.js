const jwt = require("jsonwebtoken");
const User = require("../models/user");
const MyErrors = require("../utils/customError.js");

//this is the middleware to authorize the user request
const auth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    //getting the token from the Authorization Header
    if (authorization && authorization.startsWith("Bearer")) {
        let token = authorization.split(" ")[1]
        try {
            //decoding the token
            let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            let user = await User.findById(payload.id, "-password -__v")

            if (!user) {
                return next(MyErrors.notFound({ message: "User Not Found" }))
            }

            if (user.blackList.findIndex((ele) => {
                return ele === token
            }) > -1) {
                return next(MyErrors.unAuthorized({ message: "Invalid Access Token" }))
            }

            req.user = user
            next()

        } catch (error) {
            next(error)
        }
    }
    else {
        next(MyErrors.unAuthorized({
            message: "Please Provide Authorization Token"
        }))
    }

}


module.exports = { auth }