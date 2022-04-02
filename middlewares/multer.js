const multer = require('multer');

const storage = multer.memoryStorage();
const resumeFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only pdf file type is supported for this field'), false);
  }
};
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    console.log('imagetrue');
    cb(null, true);
  } else {
    cb(
      new Error(
        'Only png, jpg and jpeg file types are supported for this field'
      ),
      false
    );
  }
};
exports.imageUploadMiddleware = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single('image');
exports.resumeUploadMiddleware = multer({
  storage: storage,
  fileFilter: resumeFilter,
}).single('resume');
