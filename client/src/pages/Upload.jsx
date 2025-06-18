import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EmojiPicker from 'emoji-picker-react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ImagePlus, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UploadPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    department: 'Software Engineering',
    year: '2025',
    lastWords: '',
    story: '',
    images: [],
  })
  const [uploading, setUploading] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({
    top: 0,
    left: 0,
  })
  const fileInputRef = useRef(null)
  const emojiPickerRef = useRef(null)

  // Last Words Editor
  const lastWordsEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Your memorable short message...',
      }),
    ],
    content: formData.lastWords,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, lastWords: editor.getHTML() }))
    },
  })

  // Story Editor
  const storyEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Share your journey, advice, or memories...',
      }),
    ],
    content: formData.story,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, story: editor.getHTML() }))
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + formData.images.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }

    const imagePreviews = files.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      }
    })

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imagePreviews],
    }))
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]
    URL.revokeObjectURL(newImages[index].preview)
    newImages.splice(index, 1)
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      // Here you would typically upload to your backend
      // const formPayload = new FormData();
      // formPayload.append('name', formData.name);
      // ... append other fields
      // formData.images.forEach(img => formPayload.append('images', img.file));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // On success:
      navigate('/gallery')
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleEmojiClick = (emojiData, editor) => {
    editor.commands.insertContent(emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const openEmojiPicker = (editor, event) => {
    if (showEmojiPicker) {
      setShowEmojiPicker(false)
      return
    }

    const buttonRect = event.target.getBoundingClientRect()
    setEmojiPickerPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX,
    })
    setShowEmojiPicker(true)
    emojiPickerRef.current = editor
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-primary sm:text-4xl"
          >
            Share Your Farewell Message
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-text-secondary"
          >
            Leave your mark before you graduate! Share your story, wisdom, and
            memories.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8 border border-border"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-primary focus:border-primary"
                >
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Graduation Year *
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-primary focus:border-primary"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Images (Max 5) *
                </label>
                <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg px-6 pt-5 pb-6">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Preview ${index}`}
                          className="h-24 w-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-300 mt-2">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                      >
                        <span>Upload photos</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          ref={fileInputRef}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      PNG, JPG up to 5MB each
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Words Editor */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Last Words (Short Message) *
              </label>
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-border">
                {lastWordsEditor && (
                  <BubbleMenu
                    editor={lastWordsEditor}
                    tippyOptions={{ duration: 100 }}
                  >
                    <div className="flex bg-white shadow-lg rounded-md p-1">
                      <button
                        onClick={() =>
                          lastWordsEditor.chain().focus().toggleBold().run()
                        }
                        className={`p-1 rounded ${
                          lastWordsEditor.isActive('bold') ? 'bg-gray-200' : ''
                        }`}
                      >
                        <span className="font-bold">B</span>
                      </button>
                      <button
                        onClick={() =>
                          lastWordsEditor.chain().focus().toggleItalic().run()
                        }
                        className={`p-1 rounded ${
                          lastWordsEditor.isActive('italic')
                            ? 'bg-gray-200'
                            : ''
                        }`}
                      >
                        <span className="italic">I</span>
                      </button>
                      <button
                        onClick={() =>
                          lastWordsEditor
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                        }
                        className={`p-1 rounded ${
                          lastWordsEditor.isActive('underline')
                            ? 'bg-gray-200'
                            : ''
                        }`}
                      >
                        <span className="underline">U</span>
                      </button>
                      <button
                        onClick={(e) => openEmojiPicker(lastWordsEditor, e)}
                        className="p-1 rounded"
                      >
                        😊
                      </button>
                    </div>
                  </BubbleMenu>
                )}
                <EditorContent
                  editor={lastWordsEditor}
                  className="min-h-[8rem] p-3"
                />
              </div>
            </div>

            {/* Story Editor */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Your Story (Detailed Message) *
              </label>
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-border">
                {storyEditor && (
                  <BubbleMenu
                    editor={storyEditor}
                    tippyOptions={{ duration: 100 }}
                  >
                    <div className="flex bg-white shadow-lg rounded-md p-1">
                      <button
                        onClick={() =>
                          storyEditor.chain().focus().toggleBold().run()
                        }
                        className={`p-1 rounded ${
                          storyEditor.isActive('bold') ? 'bg-gray-200' : ''
                        }`}
                      >
                        <span className="font-bold">B</span>
                      </button>
                      <button
                        onClick={() =>
                          storyEditor.chain().focus().toggleItalic().run()
                        }
                        className={`p-1 rounded ${
                          storyEditor.isActive('italic') ? 'bg-gray-200' : ''
                        }`}
                      >
                        <span className="italic">I</span>
                      </button>
                      <button
                        onClick={() =>
                          storyEditor.chain().focus().toggleUnderline().run()
                        }
                        className={`p-1 rounded ${
                          storyEditor.isActive('underline') ? 'bg-gray-200' : ''
                        }`}
                      >
                        <span className="underline">U</span>
                      </button>
                      <button
                        onClick={() =>
                          storyEditor.chain().focus().setTextAlign('left').run()
                        }
                        className={`p-1 rounded ${
                          storyEditor.isActive({ textAlign: 'left' })
                            ? 'bg-gray-200'
                            : ''
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M3 14h18M3 18h18M3 6h18"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          storyEditor
                            .chain()
                            .focus()
                            .setTextAlign('center')
                            .run()
                        }
                        className={`p-1 rounded ${
                          storyEditor.isActive({ textAlign: 'center' })
                            ? 'bg-gray-200'
                            : ''
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M3 14h18M3 18h18M3 6h18"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => openEmojiPicker(storyEditor, e)}
                        className="p-1 rounded"
                      >
                        😊
                      </button>
                    </div>
                  </BubbleMenu>
                )}
                <EditorContent
                  editor={storyEditor}
                  className="min-h-[16rem] p-3"
                />
              </div>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div
                className="absolute z-50"
                style={{
                  top: `${emojiPickerPosition.top}px`,
                  left: `${emojiPickerPosition.left}px`,
                }}
              >
                <EmojiPicker
                  onEmojiClick={(emojiData) =>
                    handleEmojiClick(emojiData, emojiPickerRef.current)
                  }
                  width={300}
                  height={400}
                />
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/gallery')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-text-primary hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  uploading ||
                  !formData.name ||
                  !formData.lastWords ||
                  !formData.story ||
                  formData.images.length === 0
                }
                className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-button hover:bg-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    <Upload className="w-5 h-5 mr-2" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default UploadPage
