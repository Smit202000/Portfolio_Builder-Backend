const { Schema, model } = require('mongoose');
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
    required: true,
    default: false,
  },
});
exports.userModel = model('User', userSchema);
