const express = require('express');
const {
  fetchData,
  uploadResume,
} = require('../controllers/fetch-resume-data.controller');
const router = express.Router();
router.post('/upload-resume', uploadResume);
router.get('/fetch-resume-data', fetchData);
module.exports = router;
