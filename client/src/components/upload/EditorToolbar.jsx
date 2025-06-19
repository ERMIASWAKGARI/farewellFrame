import { Bold, Italic, Strikethrough, Underline } from 'lucide-react'

const EditorToolbar = ({ editor = false }) => {
  if (!editor) return null

  const buttonClasses = `p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors`
  const activeClasses =
    'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'

  return (
    <div className="flex flex-wrap items-center gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${buttonClasses} ${
          editor.isActive('bold') ? activeClasses : ''
        }`}
        title="Bold"
      >
        <Bold className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${buttonClasses} ${
          editor.isActive('italic') ? activeClasses : ''
        }`}
        title="Italic"
      >
        <Italic className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${buttonClasses} ${
          editor.isActive('underline') ? activeClasses : ''
        }`}
        title="Underline"
      >
        <Underline className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${buttonClasses} ${
          editor.isActive('strike') ? activeClasses : ''
        }`}
        title="Strikethrough"
      >
        <Strikethrough className="w-5 h-5" />
      </button>
    </div>
  )
}

export default EditorToolbar
