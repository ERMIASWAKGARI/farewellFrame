const express = require('express')
const router = express.Router()
const fileUpload = require('../config/multer')

const {
  createFarewell,
  getAllFarewells,
  deleteFarewell,
  getUserFarewell,
} = require('../controllers/farewell')
const { protect } = require('../middleware/auth')

const { ValidationError } = require('../utils/errors')

router
  .route('/')
  .post(
    protect,
    (req, res, next) => {
      fileUpload.fields([{ name: 'images', maxCount: 2 }])(req, res, (err) => {
        if (err) {
          console.error('Multer error:', err)
          throw new ValidationError(err.message || 'File upload error')
        }
        next()
      })
    },
    createFarewell
  )
  .get(getAllFarewells)

router.route('/user').get(protect, getUserFarewell)
router.route('/:id').delete(deleteFarewell)

module.exports = router
