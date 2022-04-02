const { userModel } = require('../models/user');
const fs = require('fs');
const pdf = require('pdf-parse');

exports.uploadResume = (req, res, next) => {
  const resumeUrl = req.file.path;
};

exports.fetchData = (req, res, next) => {
  console.log(__dirname);
  //   let dataBuffer = fs.readFileSync();

  //   pdf(dataBuffer)
  //     .then((d) => {
  //       console.log(d);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
};
