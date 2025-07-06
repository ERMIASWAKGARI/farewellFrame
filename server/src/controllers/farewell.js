const Farewell = require('../models/Farewell')
const cloudinary = require('../utils/cloudinary')
const { Types } = require('mongoose')
const catchAsync = require('../utils/catchAsync')
const {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} = require('../utils/errors')

const createFarewell = catchAsync(async (req, res, next) => {
  const { name, department, year, lastWords, story, defaultIndex } = req.body
  const userId = req.user?.id
  console.log('Creating farewell for user:', userId, 'with data:', {
    name,
    department,
    year,
    lastWords,

    story,
    defaultIndex,
  })

  if (!userId) {
    throw new UnauthorizedError('Unauthorized. User ID is missing.')
  }

  const imagesArray = req.files?.images || []

  if (imagesArray.length === 0) {
    throw new ValidationError('At least one image is required')
  }

  const defaultIdx = parseInt(defaultIndex, 10)
  if (isNaN(defaultIdx)) {
    throw new ValidationError('Invalid defaultIndex')
  }

  const images = imagesArray.map((file, idx) => ({
    path: file.path,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    isDefault: idx === defaultIdx,
  }))

  const farewell = new Farewell({
    user: userId,
    name,
    department,
    year,
    lastWords,
    story,
    images,
  })

  await farewell.save()

  res.status(201).json({
    success: true,
    data: farewell,
  })
})

const getAllFarewells = catchAsync(async (req, res, next) => {
  const farewells = await Farewell.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: farewells.length,
    data: farewells,
  })
})

const deleteFarewell = catchAsync(async (req, res, next) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    throw new ValidationError('Invalid farewell ID')
  }

  const farewell = await Farewell.findById(id)

  if (!farewell) {
    throw new NotFoundError('Farewell not found')
  }

  await Promise.all(
    farewell.images.map((image) =>
      cloudinary.uploader
        .destroy(image.path)
        .catch((err) =>
          console.error(`Error deleting Cloudinary file ${image.path}:`, err)
        )
    )
  )

  if (farewell.video) {
    await cloudinary.uploader.destroy(farewell.video, {
      resource_type: 'video',
    })
  }

  res.status(200).json({
    success: true,
    message: 'Farewell deleted successfully',
  })
})

const getUserFarewell = catchAsync(async (req, res, next) => {
  const userId = req.user.id

  const farewell = await Farewell.findOne({ user: userId }).populate(
    'user',
    'name email'
  )

  if (!farewell) {
    return res.status(200).json({
      success: true,
      data: null,
    })
  }

  res.status(200).json({
    success: true,
    data: farewell,
  })
})

module.exports = {
  createFarewell,
  getAllFarewells,
  deleteFarewell,
  getUserFarewell,
}
