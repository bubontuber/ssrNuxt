const path = require('path')
const multer = require('multer')
// eslint-disable-next-line no-unused-vars
const moment = require('moment')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../static'))
  },
  filename (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

module.exports = multer({
  storage
})
