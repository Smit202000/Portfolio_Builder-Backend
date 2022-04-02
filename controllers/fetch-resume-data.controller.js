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
  if (req.file) {
    try {
      const file = await dataUri(req);
      const result = await uploader.upload(file.content);

      const image = result.url;
      return res.status(200).json({
        messge: 'Your file has been uploded successfully',
        data: {
          image,
        },
      });
    } catch (err) {
      res.status(500).json({
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
