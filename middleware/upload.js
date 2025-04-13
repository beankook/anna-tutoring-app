// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Define storage location and filename logic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // create this folder if it doesn't exist
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Filter image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|jfif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb(new Error("Only images are allowed"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
