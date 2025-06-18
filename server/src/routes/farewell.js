const express = require('express')
const multer = require('multer')

const router = express.Router()

router.post('/create', upload.array('images'), create)

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // or use disk storage
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5, // Max 5 files
  },
})

const create = async (req, res) => {
  try {
    // Text fields are available in req.body
    const { name, department, year, lastWords, story } = req.body

    // Files are available in req.files
    const images = req.files.map((file) => {
      // Process each file here
      return {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        // Add any additional processing
      }
    })

    // Create your farewell record here
    const farewell = {
      name,
      department,
      year,
      lastWords,
      story,
      images,
    }

    res.status(201).json(farewell)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = router
