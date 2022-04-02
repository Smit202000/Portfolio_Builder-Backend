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
app.use(errorHandler)
// const User = require("./models/user")
// ====
// const u = User({first_name:"a", last_name:"b", email:"a@a.a", password:"1", user_name:"a"})
// u.save().then(_=>console.log(_)).catch(e=>console.log(e.message))
// =======

const portfoliRoute = require('./routes/portfolio-form.routes');

app.use(portfoliRoute);

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
