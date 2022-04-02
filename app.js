import { json } from 'body-parser';
import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
config();
const app = express();
app.use(cors());
app.use(json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const connectDb = async () => {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};
connectDb();
