const express = require('express');
const {
  imageUploadMiddleware,
  resumeUploadMiddleware,
} = require('../middlewares/multer');
const {
  fetchData,
  fileUpload,
} = require('../controllers/fetchResumeData.controller');
const auth = require('../middlewares/auth');

const router = express.Router();
router.post('/upload-resume', resumeUploadMiddleware, auth, fileUpload);
router.post('/upload-image', imageUploadMiddleware, auth, fileUpload);
router.get('/fetch-resume-data', fetchData);
module.exports = router;
