const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const {
  createFarewell,
  getAllFarewells,
  deleteFarewell,
  getUserFarewell,
} = require('../controllers/farewell')
const { protect } = require('../middleware/auth')

router
  .route('/')
  .post(protect, upload.array('images'), createFarewell)
  .get(getAllFarewells)

router.route('/user').get(protect, getUserFarewell)
router.route('/:id').delete(deleteFarewell)

module.exports = router
