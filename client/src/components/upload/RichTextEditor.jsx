import { EditorContent } from '@tiptap/react'
import { useEffect, useState } from 'react'
import EditorToolbar from './EditorToolbar'

const RichTextEditor = ({
  label,
  editor,
  minHeight = '12rem',
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
          <EditorToolbar editor={editor} />
        </div>

        {/* Editor Content */}
        {/* Editor Content (Scrollable) */}
        <div className="p-4 max-h-[30vh] overflow-y-auto custom-scrollbar rounded-b-xl">
          <EditorContent
            editor={editor}
            className={`w-full min-h-[${minHeight}] rounded-md bg-gray-300 dark:bg-gray-600 focus:outline-none prose dark:prose-invert prose-sm max-w-none
      ${textColor} ${placeholderColor}
      prose-headings:text-current
      prose-strong:text-current prose-strong:font-bold
      prose-em:text-current prose-em:italic
      prose-ul:list-disc prose-ol:list-decimal
      prose-li:marker:text-current
      prose-blockquote:border-l-2 prose-blockquote:border-current
      prose-blockquote:pl-4 prose-blockquote:italic
      prose-code:bg-gray-100 dark:prose-code:bg-gray-700
      prose-code:px-1 prose-code:rounded
      prose-pre:bg-gray-800 prose-pre:text-gray-100
      prose-a:text-primary hover:prose-a:text-primary-dark
      prose-hr:border-gray-200 dark:prose-hr:border-gray-600`}
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
