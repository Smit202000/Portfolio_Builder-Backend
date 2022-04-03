const express = require('express');
const {
  contactFormController,
} = require('../controllers/contactForm.controller');
const router = express.Router();
router.post('/contact-form/:userName', contactFormController);
module.exports = router;
