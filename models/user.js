const { mongoose, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
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
    maxlength: 10
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
  have_opted_in_for_portfolio: {
    type: Boolean,
    required: true
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

 const userModel = mongoose.model('User', userSchema);

 module.exports = userModel