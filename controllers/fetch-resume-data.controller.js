const { userModel } = require('../models/user');
const fs = require('fs');
const pdf = require('pdf-parse');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');
const { uploader } = require('cloudinary');
const dataUri = async (req) =>
  await parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
exports.fileUpload = async (req, res, next) => {
  // const resumeUrl = req.file;
  // console.log(resumeUrl, 'resmue url');
  if (req.file) {
    try {
      const file = await dataUri(req);
      // console.log(file.content);
      const result = await uploader.upload(file.content);

      const image = result.url;
      return res.status(200).json({
        messge: 'Your image has been uploded successfully to cloudinary',
        data: {
          image,
        },
      });
    } catch (err) {
      res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          err,
        },
      });
    }
  }
};

exports.fetchData = (req, res, next) => {
  //   console.log(__dirname);
  //   let dataBuffer = fs.readFileSync();
  //   pdf(dataBuffer)
  //     .then((d) => {
  //       console.log(d);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
};
//IMPORT THE MODEL WE CREATED EARLIER
