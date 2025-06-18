const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const {
  createFarewell,
  getAllFarewells,
  deleteFarewell,
} = require('../controllers/farewell')
const { protect } = require('../middleware/auth')

router
  .route('/')
  .post(protect, upload.array('images'), createFarewell)
  .get(getAllFarewells)

router.route('/:id').delete(deleteFarewell)

module.exports = router
