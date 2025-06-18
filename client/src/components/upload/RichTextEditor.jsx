import { EditorContent } from '@tiptap/react'
import { useEffect, useState } from 'react'
import EditorToolbar from './EditorToolbar'

const RichTextEditor = ({
  label,
  editor,
  onEmojiClick,
  showTextAlign = false,
  borderColor = 'border-gray-200 dark:border-gray-600',
  bgColor = 'bg-white dark:bg-gray-800',
  textColor = 'text-gray-800 dark:text-gray-100',
  placeholderColor = 'placeholder-gray-400 dark:placeholder-gray-500',
  rounded = 'rounded-xl',
  shadow = 'shadow-md',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!editor) return

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    editor.on('focus', handleFocus)
    editor.on('blur', handleBlur)

    return () => {
      editor.off('focus', handleFocus)
      editor.off('blur', handleBlur)
    }
  }, [editor])

  if (!editor)
    return (
      <div className="text-center text-sm text-gray-500">Loading editor...</div>
    )

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
          {label}
        </label>
      )}

      <div
        className={`relative ${bgColor} ${rounded} ${shadow} border ${borderColor} transition-all duration-300 ${
          isFocused ? 'ring-2 ring-primary-500/40 border-primary-500' : ''
        }`}
      >
        {/* Always Visible Toolbar */}
        <div className="border-b border-gray-100 dark:border-gray-700 p-2">
          <EditorToolbar
            editor={editor}
            onEmojiClick={onEmojiClick}
            showTextAlign={showTextAlign}
          />
        </div>

        {/* Editor Content - Expanded to fill space */}
        <div className="p-4">
          <EditorContent
            editor={editor}
            className={`w-full focus:outline-none prose prose-sm dark:prose-invert max-w-none ${textColor} ${placeholderColor}`}
          />
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
        <span>
          {editor.getText().length} characters,{' '}
          {editor.getText().split(/\s+/).filter(Boolean).length} words
        </span>
        <span className="italic">Markdown supported</span>
      </div>
    </div>
  )
}

export default RichTextEditor
