import { Schema, model } from 'mongoose';

import { Schema, model } from 'mongoose';
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
  social_media_profiles: {
    type: [String],
  },
});
export const portfolioModel = model('Portfolio', portfolioSchema);
