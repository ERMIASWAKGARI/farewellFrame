// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BasicInfoSection from '../components/upload/BasicInfoSection'
import FormActions from '../components/upload/FormActions'
import FormHeader from '../components/upload/FormHeader'
import ImageUploader from '../components/upload/ImageUploader'
import RichTextEditor from '../components/upload/RichTextEditor'
import { useUploadForm } from '../hooks/useUploadForm'

const UploadPage = () => {
  const {
    formData,
    uploading,
    showPreview,
    setShowPreview,
    lastWordsEditor,
    storyEditor,
    handleChange,
    handlePreview,
    handleImageUpload,
    setDefaultImage,
    removeImage,
    submitForm,
  } = useUploadForm()

  const navigate = useNavigate()

  const InfoItem = ({ label, value }) => (
    <div>
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="text-lg font-medium text-text-primary">{value}</p>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Single optimized blob background */}
      <div
        className="fixed w-[25rem] h-[25rem] bg-primary/10 rounded-full blur-[40px] z-0 pointer-events-none animate-float"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 min-h-screen"
      >
        <div className="max-w-4xl mx-auto">
          <FormHeader />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-lg p-6 sm:p-8 border border-border relative z-20"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handlePreview(e)
              }}
              className="space-y-6 relative z-20"
            >
              <BasicInfoSection
                formData={formData}
                handleChange={handleChange}
              />
              <ImageUploader
                images={formData.images}
                handleImageUpload={handleImageUpload}
                setDefaultImage={setDefaultImage}
                removeImage={removeImage}
              />
              <RichTextEditor
                label="Last Words (Short Message) *"
                editor={lastWordsEditor}
                minHeight="8rem"
              />
              <RichTextEditor
                label="Your Story (Detailed Message) *"
                editor={storyEditor}
                minHeight="16rem"
                showTextAlign
              />
              <FormActions
                uploading={uploading}
                isValid={
                  formData.name &&
                  formData.lastWords &&
                  formData.story &&
                  formData.images.length > 0
                }
                onCancel={() => navigate('/')}
              />
            </form>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[200] flex items-center justify-center p-4"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.1) 0%, rgba(0,0,0,0) 50%)',
                  'radial-gradient(circle at 70% 50%, rgba(251, 146, 60, 0.1) 0%, rgba(0,0,0,0) 50%)',
                  'radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.1) 0%, rgba(0,0,0,0) 50%)',
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-amber-50 to-gray-50 dark:from-gray-800 dark:to-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h2
                      className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Your Farewell Preview
                    </motion.h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Review before sharing with the community
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close preview"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Main content with scrollable area */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {/* Combined Info Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10">
                          <svg
                            className="w-5 h-5 text-amber-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </span>
                        Personal Details
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <InfoItem
                          label="Full Name"
                          value={formData.name}
                          icon="user"
                        />
                        <InfoItem
                          label="Department"
                          value={formData.department}
                          icon="academic-cap"
                        />
                        <InfoItem
                          label="Graduation Year"
                          value={formData.year}
                          icon="calendar"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Title with icon */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10">
                          <svg
                            className="w-4 h-4 text-amber-500 dark:text-amber-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-tight">Last Words</span>
                      </h3>

                      {/* Content Box */}
                      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm ring-1 ring-inset ring-gray-100 dark:ring-gray-700/30">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formData.lastWords,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images Gallery - Now full width */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10">
                        <svg
                          className="w-5 h-5 text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      Images ({formData.images.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {formData.images.map((img, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="relative aspect-square group overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600"
                        >
                          <img
                            src={img.preview}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                            alt={`Memory ${idx + 1}`}
                          />
                          {img.isDefault && (
                            <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Main
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Story Section - Full width with constrained height */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10">
                        <svg
                          className="w-5 h-5 text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      Your Story
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                      <div
                        className="max-h-[40vh] overflow-y-auto pr-3 custom-scrollbar"
                        dangerouslySetInnerHTML={{ __html: formData.story }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900">
                <motion.div
                  className="flex flex-col sm:flex-row justify-end gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                      />
                    </svg>
                    Edit Details
                  </button>
                  <button
                    onClick={submitForm}
                    disabled={uploading}
                    className="px-6 py-2.5 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
                  >
                    {uploading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Publish Farewell
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadPage
