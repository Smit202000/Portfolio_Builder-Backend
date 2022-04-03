const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');
exports.dataUri = (req) => {
  // console.log(req, 'req');
  return parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};
