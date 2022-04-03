const { model, Schema } = require('mongoose');

const contactFormSchema = new Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: 'User', //model name User from user model lastline
    required: true,
  },
});

const contactFormModel = model('ContactForm', contactFormSchema);

module.exports = contactFormModel;
