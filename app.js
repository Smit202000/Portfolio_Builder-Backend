const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes/user.routes');
const res = require('express/lib/response');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(router)

const result = mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
if (!result) {
  console.log("error");
}
app.get('/new', (req, res) => {
  const abs = "hiiiiiii"
  res.send(abs)
})

app.listen(1234, () => {
  console.log('Server started on port: ', 1234);
});