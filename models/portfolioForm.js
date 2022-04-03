const { model, Schema } = require('mongoose');

const portfolioSchema = new Schema({
  about: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  educationDetails: {
    type: [Object],
  },
  experienceDetails: {
    type: [Object],
  },
  skills: {
    type: [Object],
  },
  projects: {
    type: [Object],
  },
  // certificates: {
  //   type: [String],
  // },
  // languages: {
  //   type: [String],
  // },
  // hobbies: {
  //   type: [String],
  // },
  // strengths: {
  //   type: [String],
  // },
  socialMediaProfiles: {
    type: [Object],
  },
  address: {
    type: Object,
  },
  // testimonials: {
  //   type: String
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const portfolioModel = model('Portfolio', portfolioSchema);

module.exports = portfolioModel;
