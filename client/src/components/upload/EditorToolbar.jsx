import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  SmileIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react'

const EditorToolbar = ({ editor, onEmojiClick, showTextAlign = false }) => {
  if (!editor) return null

  const buttonClasses = `p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors`
  const activeClasses =
    'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'

  return (
    <div className="flex flex-wrap items-center gap-1">
      <ToolbarButton
        title="Bold"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        icon={<BoldIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('bold') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Italic"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        icon={<ItalicIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('italic') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Underline"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        icon={<UnderlineIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('underline') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Strikethrough"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        icon={<StrikethroughIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('strike') ? activeClasses : ''
        }`}
      />

      {showTextAlign && (
        <>
          <ToolbarButton
            title="Align left"
            active={editor.isActive({ textAlign: 'left' })}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            icon={<AlignLeftIcon className="w-5 h-5" />}
            className={`${buttonClasses} ${
              editor.isActive({ textAlign: 'left' }) ? activeClasses : ''
            }`}
          />
          <ToolbarButton
            title="Align center"
            active={editor.isActive({ textAlign: 'center' })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            icon={<AlignCenterIcon className="w-5 h-5" />}
            className={`${buttonClasses} ${
              editor.isActive({ textAlign: 'center' }) ? activeClasses : ''
            }`}
          />
          <ToolbarButton
            title="Align right"
            active={editor.isActive({ textAlign: 'right' })}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            icon={<AlignRightIcon className="w-5 h-5" />}
            className={`${buttonClasses} ${
              editor.isActive({ textAlign: 'right' }) ? activeClasses : ''
            }`}
          />
        </>
      )}

      <ToolbarButton
        title="Bullet list"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        icon={<ListIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('bulletList') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Numbered list"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={<ListOrderedIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('orderedList') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Code"
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
        icon={<CodeIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('code') ? activeClasses : ''
        }`}
      />

      <ToolbarButton
        title="Link"
        onClick={() => {
          const previousUrl = editor.getAttributes('link').href
          const url = window.prompt('URL', previousUrl)
          if (url === null) return
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
          }
          editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run()
        }}
        icon={<LinkIcon className="w-5 h-5" />}
        className={`${buttonClasses} ${
          editor.isActive('link') ? activeClasses : ''
        }`}
      />

      <ToolbarButton
        title="Emoji"
        onClick={onEmojiClick}
        icon={<SmileIcon className="w-5 h-5" />}
        className={buttonClasses}
      />
    </div>
  )
}

const ToolbarButton = ({ onClick, icon, className, title, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={className}
    title={title}
    aria-pressed={active}
  >
    {icon}
  </button>
)

export default EditorToolbar
