import { Bold, Italic, Strikethrough, Underline } from 'lucide-react'

const EditorToolbar = ({ editor = false }) => {
  if (!editor) return null

  const buttonClasses = `p-2 rounded-md text-gray-500 dark:text-gray-400 transition-colors`
  const activeClasses =
    'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
  const hoverClasses =
    'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200'

  return (
    <div className="flex flex-wrap items-center gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${buttonClasses} ${
          editor.isActive('bold') ? activeClasses : hoverClasses
        }`}
        title="Bold"
      >
        <Bold className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${buttonClasses} ${
          editor.isActive('italic') ? activeClasses : hoverClasses
        }`}
        title="Italic"
      >
        <Italic className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${buttonClasses} ${
          editor.isActive('underline') ? activeClasses : hoverClasses
        }`}
        title="Underline"
      >
        <Underline className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${buttonClasses} ${
          editor.isActive('strike') ? activeClasses : hoverClasses
        }`}
        title="Strikethrough"
      >
        <Strikethrough className="w-5 h-5" />
      </button>
    </div>
  )
}

export default EditorToolbar
