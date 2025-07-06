const Farewell = require('../models/Farewell')
const path = require('path')
const fs = require('fs/promises')
const { Types } = require('mongoose')
const catchAsync = require('../utils/catchAsync')
const {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} = require('../utils/errors')

const formatUploadedImages = (files, defaultIndex) => {
  return files.map((file, idx) => ({
    path: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    isDefault: idx === defaultIndex,
  }))
}

const createFarewell = catchAsync(async (req, res, next) => {
  const { name, department, year, lastWords, story } = req.body
  const userId = req.user?.id
  console.log('req.body', req.body)

  if (!userId) {
    throw new UnauthorizedError('Unauthorized. User ID is missing.')
  }

  const defaultIdx = parseInt(req.body.defaultIndex, 10)
  if (isNaN(defaultIdx)) {
    throw new ValidationError('Invalid defaultIndex')
  }

  if (!req.files || req.files.length === 0) {
    throw new ValidationError('At least one image is required')
  }

  const images = formatUploadedImages(req.files, defaultIdx)

  const farewell = new Farewell({
    user: userId,
    name,
    department,
    year,
    lastWords,
    story,
    images,
  })

  try {
    await farewell.save()
  } catch (err) {
    // Clean up uploaded files if saving fails
    await Promise.all(
      req.files.map((file) =>
        fs
          .unlink(file.path)
          .catch((cleanupErr) =>
            console.error('Failed to delete file:', cleanupErr)
          )
      )
    )
    throw err // Re-throw the error for the error handler
  }

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

  // Delete associated images
  await Promise.all(
    farewell.images.map((image) =>
      fs
        .unlink(image.path)
        .catch((err) =>
          console.error(`Error deleting file ${image.path}:`, err)
        )
    )
  )

  await farewell.deleteOne()

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

// Add to exports
module.exports = {
  createFarewell,
  getAllFarewells,
  deleteFarewell,
  getUserFarewell, // Add this
}
