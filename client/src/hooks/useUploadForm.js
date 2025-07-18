import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getUserFarewell,
  uploadFarewell,
} from '../features/farewell/farewellAPI'
import { showToast } from '../features/toast/toastSlice'

export const useUploadForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    department: 'Software Engineering',
    year: '2025',
    lastWords: '',
    story: '',
    images: [],
  })

  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({
    top: 0,
    left: 0,
  })
  const [existingFarewell, setExistingFarewell] = useState(null)
  const [loadingFarewell, setLoadingFarewell] = useState(true)
  const [checkError, setCheckError] = useState(null)
  const emojiPickerRef = useRef(null)

  // Check for existing farewell on mount
  useEffect(() => {
    const checkExistingFarewell = async () => {
      try {
        setLoadingFarewell(true)
        setCheckError(null)
        const response = await getUserFarewell(token)
        if (response.data) {
          setExistingFarewell(response.data)
        }
      } catch (error) {
        console.error('Error checking for existing farewell:', error)
        setCheckError(
          error.response?.data?.message ||
            'Failed to check for existing farewell'
        )
      } finally {
        setLoadingFarewell(false)
      }
    }

    if (token) {
      checkExistingFarewell()
    }
  }, [token])

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
    if (formData.images.length + files.length > 2) {
      dispatch(
        showToast({
          message: 'Exactly 2 images required', // Updated message
          type: 'warning',
        })
      )
      return
    }

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isDefault: formData.images.length === 0 && files.indexOf(file) === 0,
    }))

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...previews],
    }))
  }

  const setDefaultImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isDefault: i === index,
      })),
    }))
  }

  const removeImage = (index) => {
    setFormData((prev) => {
      const images = [...prev.images]
      URL.revokeObjectURL(images[index]?.preview)
      images.splice(index, 1)
      if (images.length && !images.some((img) => img.isDefault)) {
        images[0].isDefault = true
      }
      return { ...prev, images }
    })
  }

  // In useUploadForm.js
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.lastWords ||
      !formData.story ||
      formData.images.length !== 2 // Changed from === 0 to !== 2
    ) {
      dispatch(
        showToast({
          message:
            formData.images.length < 2
              ? 'Please upload exactly 2 images'
              : 'Please fill all required fields',
          type: 'error',
        })
      )
      return false
    }
    return true
  }

  const handlePreview = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setShowPreview(true)
  }

  const submitForm = async (e) => {
    if (e) e.preventDefault()

    if (!validateForm()) return

    setUploading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('department', formData.department)
      formDataToSend.append('year', formData.year)
      formDataToSend.append('lastWords', formData.lastWords)
      formDataToSend.append('story', formData.story)

      // Find the index of the default image
      const defaultIndex = formData.images.findIndex((img) => img.isDefault)
      formDataToSend.append('defaultIndex', defaultIndex.toString())

      formData.images.forEach((img) => {
        formDataToSend.append('images', img.file)
      })
      console.log('Submitting form data:', formDataToSend)

      await uploadFarewell(formDataToSend, token)
      dispatch(showToast({ message: 'Upload successful!', type: 'success' }))
      navigate('/#gallery')
    } catch (error) {
      console.error('Upload error:', error.message)
      dispatch(
        showToast({
          message: error.message,
          type: 'error',
        })
      )
    } finally {
      setUploading(false)
      setShowPreview(false)
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
    showPreview,
    setShowPreview,
    showEmojiPicker,
    emojiPickerPosition,
    lastWordsEditor,
    storyEditor,
    handleChange,
    handlePreview,
    handleImageUpload,
    setDefaultImage,
    removeImage,
    submitForm,
    handleEmojiClick,
    openEmojiPicker,
    emojiPickerRef,
    existingFarewell,
    loadingFarewell,
    checkError,
  }
}
