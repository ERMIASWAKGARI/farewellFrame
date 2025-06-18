const create = async (req, res) => {
  try {
    const { name, department, year, lastWords, story } = req.body

    // Process the files (req.files contains the uploaded files)
    const images = req.files.map((file) => {
      // Here you would process each file - save to cloud storage, disk, etc.
      // For example, if saving to disk:
      const filename = `${Date.now()}-${file.originalname}`
      const path = `uploads/${filename}`

      // Save file (implementation depends on your storage solution)
      // fs.writeFileSync(path, file.buffer);

      return {
        url: path, // or the URL if using cloud storage
        filename,
        mimetype: file.mimetype,
        size: file.size,
      }
    })

    // Create farewell in database
    const farewell = new Farewell({
      user: req.user.id,
      name,
      department,
      year,
      lastWords,
      story,
      images,
    })

    await farewell.save()

    res.status(201).json(farewell)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = {
  create,
}
