const pdf = require('pdf-parse');

const { uploader } = require('cloudinary');
const { dataUri } = require('../utils/dataUri');
let success = true;
exports.fileUpload = async (req, res, next) => {
  if (req.file) {
    try {
      const file = await dataUri(req);
      const result = await uploader.upload(file.content);

      const image = result.url;
      return res.status(200).json({
        message: 'Your file has been uploded successfully',
        success,
        data: {
          image,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: 'Someting went wrong while processing your request',
        success: false,
        data: {
          err,
        },
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "File didn't get uploaded.",
    });
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
