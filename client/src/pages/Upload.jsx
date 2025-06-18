// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BasicInfoSection from '../components/upload/BasicInfoSection'
import EmojiPickerWrapper from '../components/upload/EmojiPickerWrapper'
import FormActions from '../components/upload/FormActions'
import FormHeader from '../components/upload/FormHeader'
import ImageUploader from '../components/upload/ImageUploader'
import RichTextEditor from '../components/upload/RichTextEditor'
import { useUploadForm } from '../hooks/useUploadForm'

const UploadPage = () => {
  const {
    formData,
    uploading,
    showEmojiPicker,
    emojiPickerPosition,
    lastWordsEditor,
    storyEditor,
    handleChange,
    handleSubmit,
    handleImageUpload,
    removeImage,
    handleEmojiClick,
    openEmojiPicker,
    emojiPickerRef,
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

      {/* Content */}
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
            <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
              <BasicInfoSection
                formData={formData}
                handleChange={handleChange}
              />

              <ImageUploader
                images={formData.images}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
              />

              <RichTextEditor
                label="Last Words (Short Message) *"
                editor={lastWordsEditor}
                onEmojiClick={(e) => openEmojiPicker(lastWordsEditor, e)}
                minHeight="8rem"
              />

              <RichTextEditor
                label="Your Story (Detailed Message) *"
                editor={storyEditor}
                onEmojiClick={(e) => openEmojiPicker(storyEditor, e)}
                minHeight="16rem"
                showTextAlign
              />

              <EmojiPickerWrapper
                show={showEmojiPicker}
                position={emojiPickerPosition}
                onEmojiClick={handleEmojiClick}
                ref={emojiPickerRef}
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
    </div>
  )
}

export default UploadPage
