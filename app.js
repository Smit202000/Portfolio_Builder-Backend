const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
<<<<<<< HEAD
const fetchResumeDataRouter = require('./routes/fetchResumeData.routes');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');
const userRouter = require('./routes/user.routes');
const portfolioRouter = require('./routes/portfolioForm.routes');
=======
const userRouter = require("./routes/user.routes");
>>>>>>> origin/development
const { errorHandler } = require('./middlewares/errorHandler');
dotenv.config();
const app = express();
app.use(bodyparser.json());
<<<<<<< HEAD
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
cloudinaryConfig();
app.use(fetchResumeDataRouter);
app.use('/user', userRouter);
app.use('/portfolio', portfolioRouter);
app.use(errorHandler);
=======
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/user", userRouter)
app.use(errorHandler)

>>>>>>> origin/development
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
