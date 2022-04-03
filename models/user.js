const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
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
  haveOptedInForPortfolio: {
    type: Boolean,
    default: false
  },
  is_active:{
    type: Boolean,
    default: false
  }
});

userSchema.virtual('portfolios', {
  ref: 'Portfolio',
  localField: '_id',
  foreignField: 'user'
})

//This is instance method which will check the hashed password
userSchema.methods.checkPassword = async function (password) {
    
  let isMatched = await bcrypt.compare(password, this.password)
  
  return isMatched
}

userSchema.methods.getToken = function ({ exp, secret }) {
  let token;

  if (exp) {
    token = jwt.sign({ id: this._id }, secret, {
      // This time is in second

      expiresIn: exp,
    });
  } else {
    token = jwt.sign({ id: this._id }, secret);
  }

  return token;
};
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