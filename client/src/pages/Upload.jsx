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

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Orbiting Glow Blobs */}
      <motion.div
        className="fixed w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] z-0"
        initial={{ x: '-50%', y: '-50%' }}
        animate={{
          x: ['-50%', '-30%', '-50%', '-70%', '-50%'],
          y: ['-50%', '-70%', '-50%', '-30%', '-50%'],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          left: '50%',
          top: '50%',
        }}
      />

      <motion.div
        className="fixed w-[35rem] h-[35rem] bg-orange-400/15 rounded-full blur-[100px] z-0"
        initial={{ x: '-50%', y: '-50%' }}
        animate={{
          x: ['-50%', '-70%', '-50%', '-30%', '-50%'],
          y: ['-50%', '-30%', '-50%', '-70%', '-50%'],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: 'linear',
          delay: 20,
        }}
        style={{
          left: '50%',
          top: '50%',
        }}
      />

      <motion.div
        className="fixed w-[30rem] h-[30rem] bg-purple-400/10 rounded-full blur-[80px] z-0"
        initial={{ x: '-50%', y: '-50%' }}
        animate={{
          x: ['-50%', '-40%', '-50%', '-60%', '-50%'],
          y: ['-50%', '-60%', '-50%', '-40%', '-50%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: 'linear',
          delay: 40,
        }}
        style={{
          left: '50%',
          top: '50%',
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
                onCancel={() => navigate('/gallery')}
              />
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-200 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                  Review Your Submission
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-border">
                      <h3 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
                        Basic Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-text-secondary">
                            Full Name
                          </p>
                          <p className="text-lg font-medium">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">
                            Department
                          </p>
                          <p className="text-lg font-medium">
                            {formData.department}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">
                            Graduation Year
                          </p>
                          <p className="text-lg font-medium">{formData.year}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-border">
                      <h3 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
                        Last Words
                      </h3>
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: formData.lastWords }}
                      />
                    </div>
                  </div>

                  {/* Right Column - Images and Story */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-border">
                      <h3 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
                        Images ({formData.images.length})
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img.preview}
                              className="w-full h-32 object-cover rounded-lg border border-border"
                              alt={`Preview ${idx + 1}`}
                            />
                            {img.isDefault && (
                              <span className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-border">
                      <h3 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
                        Your Story
                      </h3>
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: formData.story }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 p-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowPreview(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Back to Edit
                  </button>
                  <button
                    type="button"
                    onClick={submitForm}
                    disabled={uploading}
                    className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Confirm & Submit'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadPage
