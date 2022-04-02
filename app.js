const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');

const fetchResumeDataRouter = require('./routes/fetch-resume-data.routes');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'resume');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

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
const app = express();
app.use(bodyparser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/resume', express.static(path.join(__dirname, 'resume')));
app.use(cors());
app.use(fetchResumeDataRouter);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log('Server started on port: ', process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
connectDb();
