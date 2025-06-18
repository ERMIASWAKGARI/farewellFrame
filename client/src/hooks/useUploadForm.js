import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useUploadForm = () => {
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
  const emojiPickerRef = useRef(null)

  // Editor configurations
  const lastWordsEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: 'Your memorable short message...',
      }),
    ],
    content: formData.lastWords,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, lastWords: editor.getHTML() }))
    },
  })

  const storyEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: 'Share your journey, advice, or memories...',
      }),
    ],
    content: formData.story,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, story: editor.getHTML() }))
    },
  })

  // Handler functions
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

    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

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
      await new Promise((resolve) => setTimeout(resolve, 1500))
      navigate('/gallery')
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleEmojiClick = (emojiData) => {
    if (emojiPickerRef.current) {
      emojiPickerRef.current.commands.insertContent(emojiData.emoji)
    }
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

  return {
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
  }
}
