const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const fetchResumeDataRouter = require('./routes/fetch-resume-data.routes');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri');
// file upload in local
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'resume');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   },
// });
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

dotenv.config();
console.log(process.env.CLOUDINARY_API_KEY);

const app = express();
app.use(bodyparser.json());

// app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use(multer({ storage: storage }).single('image'));
app.use(multer({ storage: storage }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'image')));
app.use('/resume', express.static(path.join(__dirname, 'resume')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(fetchResumeDataRouter);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log('Server started on port: ', process.env.PORT);
    });
  } catch (error) {
    console.log(error, 'error');
  }
};
connectDb();
