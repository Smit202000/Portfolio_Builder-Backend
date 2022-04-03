const contactFormModel = require('../models/contactForm');
const user = require('../models/user');
const mail = require('../utils/mail');
const validator = require('validator');

exports.contactFormController = async (req, res) => {
  if (!validator.isEmail(req.body.senderEmail)) {
    return res.status(200).json({
      success: false,
      error: 'Please provide valid email',
    });
  }

  const userName = req.params.userName;
  //   console.log(userName);
  const contactForm = new contactFormModel({
    senderName: req.body.senderName,
    senderEmail: req.body.senderEmail,
    subject: req.body.subject,
    message: req.body.message,
    user: userName,
  });
  try {
    await contactForm.save();

    const { email } = await user.findOne({ userName });
    console.log(email);
    const link = '';
    await mail(email, link, req.body.subject, req.body.message, '');

    res.status(200).json({
      success: true,
      data: contactForm,
    });
  } catch (error) {
    res.status(404).json({
      error,
      success: false,
    });
  }
};
