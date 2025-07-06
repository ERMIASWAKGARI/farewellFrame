const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
)

const farewellSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
  },
  lastWords: {
    type: String,
    required: [true, 'Last words are required'],
  },
  story: {
    type: String,
    required: [true, 'Story is required'],
  },
  images: [imageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Farewell', farewellSchema)
