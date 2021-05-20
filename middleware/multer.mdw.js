const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString() + '_' + file.originalname)
    }
  })
const upload = multer({ storage: storage });
module.exports = upload;