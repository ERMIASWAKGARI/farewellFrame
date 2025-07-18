// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, RotateCw } from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import BasicInfoSection from '../components/upload/BasicInfoSection'
import FormActions from '../components/upload/FormActions'
import FormHeader from '../components/upload/FormHeader'
import ImageUploader from '../components/upload/ImageUploader'
import PreviewModal from '../components/upload/PreviewModal'
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
    existingFarewell,
    loadingFarewell,
    checkError,
  } = useUploadForm()

  const navigate = useNavigate()

  if (loadingFarewell) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (checkError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl border border-border p-8 sm:p-10 max-w-md w-full text-center space-y-6 animate-fade-in">
          {/* Error Icon */}
          <div className="flex justify-center">
            <AlertTriangle
              className="text-primary w-12 h-12"
              strokeWidth={2.2}
            />
          </div>

          <h2 className="text-2xl font-bold text-text-primary">
            Oops! Something Went Wrong
          </h2>

          <p className="text-text-secondary text-sm">
            {checkError ||
              'We couldn’t load your farewell submission. Please try again.'}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-button text-white font-medium hover:bg-orange-500 transition duration-200"
          >
            <RotateCw className="w-5 h-5" /> Try Again
          </button>
        </div>
      </div>
    )
  }

  if (existingFarewell) {
    return (
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 px-4 sm:px-6 lg:px-8 py-10"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-xl border border-border px-6 sm:px-10 py-8">
              <h2 className="text-3xl font-bold text-center text-text-primary mb-4">
                🎓 Your Farewell Submission
              </h2>
              <p className="text-center text-text-secondary">
                A beautiful memory to remember your journey 🎉
              </p>

              {/* Grid Layout */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6">
                {/* Basic Info - First column, first row */}
                <div className="row-start-1 col-start-1 bg-white dark:bg-gray-700 rounded-lg p-5 border border-border shadow-sm">
                  <h3 className="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">
                    Basic Info
                  </h3>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Name:</span>{' '}
                    {existingFarewell.name}
                  </p>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">
                      Department:
                    </span>{' '}
                    {existingFarewell.department}
                  </p>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Year:</span>{' '}
                    {existingFarewell.year}
                  </p>
                </div>

                {/* Last Words - First column, second row */}
                <div className="row-start-2 col-start-1 bg-white dark:bg-gray-700 rounded-lg p-5 border border-border shadow-sm">
                  <h3 className="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">
                    Last Words
                  </h3>
                  <div
                    className="prose dark:prose-invert max-w-none text-text-secondary"
                    dangerouslySetInnerHTML={{
                      __html: existingFarewell.lastWords,
                    }}
                  />
                </div>

                {/* Images - Second column, spans two rows */}
                <div className="row-span-2 col-start-2 bg-white dark:bg-gray-700 rounded-lg p-5 border border-border shadow-sm">
                  <h3 className="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">
                    Farewell Images
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {existingFarewell.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.path}
                          alt={`Farewell image ${index + 1}`}
                          className="w-full h-36 object-cover rounded-lg border border-border shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                        {image.isDefault && (
                          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                            Default
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Story - full-width row below */}
              <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-5 border border-border shadow-sm max-h-80 overflow-y-auto custom-scrollbar">
                <h3 className="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">
                  Your Story
                </h3>
                <div
                  className="prose dark:prose-invert max-w-none text-text-secondary"
                  dangerouslySetInnerHTML={{ __html: existingFarewell.story }}
                />
              </div>

              {/* Back Button */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 text-sm sm:text-base font-medium rounded-md border border-border text-text-primary hover:bg-primary/10 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 9.75L12 4.5l9 5.25M9 22.5V12h6v10.5"
                    />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

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
          <PreviewModal
            formData={formData}
            uploading={uploading}
            setShowPreview={setShowPreview}
            submitForm={submitForm}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadPage
