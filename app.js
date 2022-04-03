const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require("./routes/user.routes");
const { errorHandler } = require('./middlewares/errorHandler');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/user", userRouter)
const portfoliRoute = require('./routes/portfolio-form.routes');

app.use(portfoliRoute);
app.use(errorHandler)

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
