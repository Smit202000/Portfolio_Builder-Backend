const express = require('express');
const {
  imageUploadMiddleware,
  resumeUploadMiddleware,
} = require('../middleware/multer');
const {
  fetchData,
  fileUpload,
} = require('../controllers/fetch-resume-data.controller');
const router = express.Router();
router.post('/upload-resume', resumeUploadMiddleware, fileUpload);
router.post('/upload-image', imageUploadMiddleware, fileUpload);
router.get('/fetch-resume-data', fetchData);
module.exports = router;
