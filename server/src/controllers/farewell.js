const Farewell = require('../models/Farewell')
const path = require('path')
const fs = require('fs')

const createFarewell = async (req, res) => {
  try {
    const { name, department, year, lastWords, story } = req.body
    console.log(req.body)
    const userId = req.user.id

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image',
      })
    }

    // Process uploaded files
    const images = req.files.map((file) => ({
      path: file.path.replace(/\\/g, '/'), // Convert to forward slashes
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
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
  } catch (error) {
    console.error('Error creating farewell:', error)

    // Cleanup uploaded files if error occurs
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err)
        })
      })
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

const getAllFarewells = async (req, res) => {
  try {
    const farewells = await Farewell.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: farewells.length,
      data: farewells,
    })
  } catch (error) {
    console.error('Error fetching farewells:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

const deleteFarewell = async (req, res) => {
  try {
    const farewell = await Farewell.findById(req.params.id)

    if (!farewell) {
      return res.status(404).json({
        success: false,
        message: 'Farewell not found',
      })
    }

    // Delete associated images
    farewell.images.forEach((image) => {
      fs.unlink(image.path, (err) => {
        if (err) console.error('Error deleting file:', err)
      })
    })

    await farewell.remove()

    res.status(200).json({
      success: true,
      message: 'Farewell deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting farewell:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

module.exports = {
  createFarewell,
  getAllFarewells,
  deleteFarewell,
}
