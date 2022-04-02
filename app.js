const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

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
