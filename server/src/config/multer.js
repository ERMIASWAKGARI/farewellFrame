const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const filename = uniqueSuffix + path.extname(file.originalname)
    cb(null, filename)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 2,
  },
})

module.exports = upload
