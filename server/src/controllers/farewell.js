const Farewell = require('../models/Farewell')
const path = require('path')
const fs = require('fs/promises')
const { Types } = require('mongoose')

const formatUploadedImages = (files, defaultIndex) => {
  return files.map((file, idx) => ({
    path: file.path.replace(/\\/g, '/'),
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    isDefault: idx === defaultIndex,
  }))
}

const createFarewell = async (req, res) => {
  try {
    const { name, department, year, lastWords, story } = req.body
    const userId = req.user?.id
    console.log('req.body', req.body)

    if (!userId) {
      throw new Error('Unauthorized. User ID is missing.')
    }

    const defaultIdx = parseInt(req.body.defaultIndex, 10)
    if (isNaN(defaultIdx)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid defaultIndex' })
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

    await farewell.save()

    return res.status(201).json({
      success: true,
      data: farewell,
    })
  } catch (error) {
    console.error('Error creating farewell:', error)

    // Clean up any uploaded files
    if (req.files) {
      for (const file of req.files) {
        try {
          await fs.unlink(file.path)
        } catch (err) {
          console.error(`Failed to delete file ${file.path}:`, err)
        }
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong while creating farewell.',
    })
  }
}

const getAllFarewells = async (req, res) => {
  try {
    const farewells = await Farewell.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: farewells.length,
      data: farewells,
    })
  } catch (error) {
    console.error('Error fetching farewells:', error)
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch farewells. Try again later.',
    })
  }
}

const deleteFarewell = async (req, res) => {
  try {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid farewell ID',
      })
    }

    const farewell = await Farewell.findById(id)

    if (!farewell) {
      return res.status(404).json({
        success: false,
        message: 'Farewell not found',
      })
    }

    // Delete associated images
    for (const image of farewell.images) {
      try {
        await fs.unlink(image.path)
      } catch (err) {
        console.error(`Error deleting file ${image.path}:`, err)
        // continue even if one image fails to delete
      }
    }

    await farewell.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Farewell deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting farewell:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Error occurred while deleting farewell',
    })
  }
}

module.exports = {
  createFarewell,
  getAllFarewells,
  deleteFarewell,
}
