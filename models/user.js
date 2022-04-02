const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken : String,
  //This will be a list of BlackListed Tokens
  blackList : {
    type: [String]
  },
  have_opted_in_for_portfolio: {
    type: Boolean,
    default: false
  }
});



//This method will execute before the user is saved
userSchema.pre("save", async function (next) {
  //If Password is modified then only we need to rehash it
  if (this.isModified("password")) {
      let hashedPassword = await bcrypt.hash(this.password, 10)
      this.password = hashedPassword
  }
  next()
})
module.exports = new mongoose.model("User", userSchema)