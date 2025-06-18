import { ImagePlus, UploadCloud } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const ImageUploader = ({ images, handleImageUpload, removeImage }) => {
  const [isDragging, setIsDragging] = useState(false)
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
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Images (Max 5) *
      </label>

      <div
        className={`mt-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
          isDragging
            ? 'border-2 border-dashed border-orange-400 bg-orange-50 dark:bg-blue-900/10'
            : 'border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-400'
        } px-6 pt-8 pb-10 relative`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Preview area */}
        {images.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-6 w-full">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative group transition-transform duration-200 hover:scale-105 ${previewSize}`}
              >
                <img
                  src={img.preview}
                  alt={`Preview ${index}`}
                  className={`object-cover rounded-lg shadow-md ${previewSize}`}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
                  {index + 1}/{images.length}
                </span>
              </div>
            ))}
          </div>
        )}

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
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:bg-button  focus-within:outline-none focus-within:ring-1 focus-within:ring-text-primary focus-within:ring-offset-1 transition-colors"
                >
                  <span>Click to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
                <p className="text-text-secondary">or drag and drop</p>
              </div>
              <p className="text-xs text-text-secondary">
                PNG, JPG up to 5MB each (max {5 - images.length} remaining)
              </p>
            </>
          )}
        </div>

        {/* Progress indicator when uploading could be added here */}
      </div>
    </div>
  )
}

export default ImageUploader
