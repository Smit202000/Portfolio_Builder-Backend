const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
var compression = require('compression');

const fetchResumeDataRouter = require('./routes/fetchResumeData.routes');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');
const userRouter = require('./routes/user.routes');
const portfolioRouter = require('./routes/portfolioForm.routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { default: helmet } = require('helmet');
dotenv.config();
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      'https://portfoliobuilder-prod.netlify.app',
      'https://portfolio-builder-dev.netlify.app',
      'http://localhost:3000',
    ],
  })
);
app.use(compression());
app.use(helmet());
cloudinaryConfig();
app.use(fetchResumeDataRouter);
app.use('/user', userRouter);
app.use(portfolioRouter);
app.use(errorHandler);
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log('Server started on port: ', process.env.PORT);
    });
  } catch (error) {
    throw error;
  }
};
connectDb();
