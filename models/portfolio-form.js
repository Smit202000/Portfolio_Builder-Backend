const { model, Schema} = require('mongoose')

const portfolioSchema = new Schema({
  about: {
    type: String
  },
  contact_number: {
    type: String,
  },
  education_details: {
    type: [Object],
  },
  experience_details: {
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
  social_media_profiles: {
    type: [Object],
  },
  address: {
    type: Object
  },
  // testimonials: {
  //   type: String
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const portfolioModel = model('Portfolio', portfolioSchema);

module.exports = portfolioModel