const { Schema, model } = require('mongoose');
const portfolioSchema = new Schema({
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
    type: [String],
  },
  projects: {
    type: [Object],
  },
  certificates: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  hobbies: {
    type: [String],
  },
  strengths: {
    type: [String],
  },
  social_media_profiles: {
    type: [String],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
exports.portfolioModel = model('Portfolio', portfolioSchema);
