/* eslint-disable no-unused-vars */
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { uploadFarewell } from '../features/farewell/farewellAPI'

import { useDispatch } from 'react-redux'
import { showToast } from '../features/toast/toastSlice'

export const useUploadForm = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth) // Get token from Redux store
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
  const [error, setError] = useState(null)
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

  // in useUploadForm hook
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (formData.images.length + files.length > 2) {
      dispatch(showToast({ message: 'Only 2 images allowed', type: 'warning' }))
      return
    }
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isDefault: false,
    }))
    setFormData((prev) => ({ images: [...prev.images, ...previews] }))
  }

  const setDefaultImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({ ...img, isDefault: i === index })),
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
    setError(null)

    try {
      const formDataToSend = new FormData()

      // Append text fields
      formDataToSend.append('name', formData.name)
      formDataToSend.append('department', formData.department)
      formDataToSend.append('year', formData.year)
      formDataToSend.append('lastWords', formData.lastWords)
      formDataToSend.append('story', formData.story)

      // Append each image file - ensure we're using the actual File object
      formData.images.forEach((image) => {
        if (image.file instanceof File) {
          formDataToSend.append('images', image.file)
        } else {
          console.error('Invalid file object:', image)
        }
      })

      // Debug: Log FormData contents
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value instanceof File ? value.name : value)
      }

      await uploadFarewell(formDataToSend, token)
      dispatch(showToast({ message: 'Upload successful!', type: 'success' }))
      navigate('/gallery')
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Failed to upload. Please try again.'
      dispatch(showToast({ message: msg, type: 'error' }))
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
    setDefaultImage,
    removeImage,
    handleEmojiClick,
    openEmojiPicker,
    emojiPickerRef,
  }
}
