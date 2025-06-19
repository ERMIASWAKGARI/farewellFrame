import { ImagePlus, UploadCloud } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../../features/toast/toastSlice'

const ImageUploader = ({
  images,
  handleImageUpload,
  removeImage,
  setDefaultImage,
}) => {
  const dispatch = useDispatch()

  const [isDragging, setIsDragging] = useState(false)
  const [previewSize, setPreviewSize] = useState('h-24 w-24')

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
      if (e.dataTransfer.files?.length) {
        if (images.length + e.dataTransfer.files.length > 2) {
          dispatch(
            showToast({
              message: 'Exactly 2 images required',
              type: 'warning',
            })
          )
          return
        }
        handleImageUpload({ target: { files: e.dataTransfer.files } })
      }
    },
    [handleImageUpload, images.length] // Added dependency
  )

  useEffect(() => {
    if (images.length <= 2) {
      setPreviewSize('h-32 w-32')
    } else if (images.length <= 4) {
      setPreviewSize('h-28 w-28')
    } else {
      setPreviewSize('h-24 w-24')
    }
  }, [images.length])

  return (
    <div className="sm:col-span-2 space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Images (Exactly 2 required) * {/* Updated text */}
      </label>

      {/* Drag-drop area */}
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl transition-all ${
          isDragging
            ? 'border-2 border-dashed border-orange-400 bg-orange-50 dark:bg-blue-900/10'
            : 'border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400'
        } px-6 pt-8 pb-10`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Preview Images */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <img
                src={img.preview}
                className={`${previewSize} object-cover rounded-lg border border-gray-300 shadow-md`}
              />

              {/* Default toggle */}
              <button
                type="button"
                onClick={() => setDefaultImage(idx)}
                className={`absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                  img.isDefault
                    ? 'bg-primary text-text-primary '
                    : 'bg-gray-300/80 dark:bg-gray-600/80 text-text-primary hover:bg-primary'
                }`}
              >
                {img.isDefault ? 'Default' : 'Set Default'}
              </button>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Upload instruction */}
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
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:bg-button px-2 py-1 transition-colors"
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
                PNG, JPG up to 5MB each —{' '}
                <span className="font-semibold">
                  {Math.max(0, 2 - images.length)}
                </span>{' '}
                more required {/* Updated message */}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUploader
