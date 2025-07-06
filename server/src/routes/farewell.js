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

router
  .route('/')
  .post(
    protect,
    (req, res, next) => {
      fileUpload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ])(req, res, (err) => {
        if (err) {
          console.error('Multer error:', err)
          return res.status(400).json({ status: 'fail', message: err.message })
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
