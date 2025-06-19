import { ImagePlus, UploadCloud } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const ImageUploader = ({
  images,
  handleImageUpload,
  removeImage,
  setDefaultImage,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [previewSize, setPreviewSize] = useState('h-24 w-24') // Default size

  // Handle drag events
  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleImageUpload({ target: { files: e.dataTransfer.files } })
      }
    },
    [handleImageUpload]
  )

  // Adjust preview size based on number of images
  useEffect(() => {
    if (images.length <= 2) {
      setPreviewSize('h-32 w-32') // Larger when few images
    } else if (images.length <= 4) {
      setPreviewSize('h-28 w-28') // Medium size
    } else {
      setPreviewSize('h-24 w-24') // Default size
    }
  }, [images.length])

  return (
    <div className="sm:col-span-2 space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Images (Max 2, 1 default) *
      </label>

      <div
        className={`mt-1 flex flex-col items-center justify-center rounded-xl ${
          isDragging
            ? 'border-2 border-dashed border-orange-400 bg-orange-50 dark:bg-blue-900/10'
            : 'border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400'
        } px-6 pt-8 pb-10 relative`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Previews */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <img
                src={img.preview}
                className="h-28 w-28 object-cover rounded-lg shadow-md"
                alt="preview"
              />

              {/* Default selector */}
              <label className="absolute bottom-1 left-1 bg-primary/80 rounded px-2 py-0.5">
                <input
                  type="radio"
                  name="defaultImage"
                  checked={img.isDefault}
                  onChange={() => setDefaultImage(idx)}
                  className="mr-1 align-middle"
                />
                Default
              </label>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Upload area */}
        <div className="text-center space-y-3">
          {isDragging ? (
            <div className="flex flex-col items-center">
              <UploadCloud className="h-10 w-10 text-primary animate-pulse" />
              <p className="mt-2 text-sm font-medium text-primary">
                Drop your files here
              </p>
            </div>
          ) : (
            <>
              <ImagePlus className="mx-auto h-10 w-10 text-text-secondary" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:bg-button focus-within:ring-1 focus-within:ring-text-primary focus-within:ring-offset-1 transition-colors"
                >
                  <span>Click to upload</span>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
                <p>or drag and drop</p>
              </div>
              <p className="text-xs text-text-secondary">
                PNG, JPG up to 5MB each — {2 - images.length} slots remaining
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUploader
