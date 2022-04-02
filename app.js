const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const fetchResumeDataRouter = require('./routes/fetch-resume-data.routes');
const { cloudinaryConfig } = require('./config/cloudinary');

dotenv.config();
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
cloudinaryConfig();
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
