const { JsonWebTokenError } = require("jsonwebtoken")
const MyErrors = require("../utils/customError.js")
const mongoose = require("mongoose");
const { MongoServerError } = require("mongodb");

const errorHandler = (error, req, res, next) => {
    console.error("error",error)
    if (error instanceof MyErrors) {
        return res.status(error.statusCode).json({
            message: error.errMsg,
            success:false
        })
    }
    else if (error instanceof JsonWebTokenError) {

        return res.status(401).json({
            message: error.message,
            success:false
        })
    }
    else if (error instanceof mongoose.Error.ValidationError || error instanceof MongoServerError) {

        return res.status(500).json({
            message: error.message,
            success:false
        })
    }
    else{
        return res.status(500).json({
            message: error.message,
            success:false
        })
    }
}

module.exports = { errorHandler }