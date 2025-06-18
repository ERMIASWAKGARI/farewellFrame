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

const EditorToolbar = ({
  editor,
  onEmojiClick,
  showTextAlign = false,
  variant = 'floating',
}) => {
  if (!editor) return null

  const base = `p-1.5 sm:p-2 rounded transition-colors`
  const bubbleStyle =
    'bg-white hover:bg-gray-100 text-gray-800 shadow-lg border border-gray-200'
  const floatingStyle =
    'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'

  const buttonClasses = `${base} ${
    variant === 'bubble' ? bubbleStyle : floatingStyle
  }`
  const activeClasses =
    variant === 'bubble'
      ? 'bg-primary-100 text-primary-800'
      : 'bg-primary-500/20 text-primary-600 dark:text-primary-400'

  const iconSize = 'w-4 h-4 sm:w-5 sm:h-5'

  return (
    <div
      className={`flex flex-wrap items-center gap-1 ${
        variant === 'bubble' ? 'p-1' : 'p-2'
      } rounded-md`}
    >
      <ToolbarButton
        title="Bold"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        icon={<BoldIcon className={iconSize} />}
        className={`${buttonClasses} ${
          editor.isActive('bold') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Italic"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        icon={<ItalicIcon className={iconSize} />}
        className={`${buttonClasses} ${
          editor.isActive('italic') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Underline"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        icon={<UnderlineIcon className={iconSize} />}
        className={`${buttonClasses} ${
          editor.isActive('underline') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Strikethrough"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        icon={<StrikethroughIcon className={iconSize} />}
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
            icon={<AlignLeftIcon className={iconSize} />}
            className={`${buttonClasses} ${
              editor.isActive({ textAlign: 'left' }) ? activeClasses : ''
            }`}
          />
          <ToolbarButton
            title="Align center"
            active={editor.isActive({ textAlign: 'center' })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            icon={<AlignCenterIcon className={iconSize} />}
            className={`${buttonClasses} ${
              editor.isActive({ textAlign: 'center' }) ? activeClasses : ''
            }`}
          />
          <ToolbarButton
            title="Align right"
            active={editor.isActive({ textAlign: 'right' })}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            icon={<AlignRightIcon className={iconSize} />}
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
        icon={<ListIcon className={iconSize} />}
        className={`${buttonClasses} ${
          editor.isActive('bulletList') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Numbered list"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={<ListOrderedIcon className={iconSize} />}
        className={`${buttonClasses} ${
          editor.isActive('orderedList') ? activeClasses : ''
        }`}
      />
      <ToolbarButton
        title="Code"
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
        icon={<CodeIcon className={iconSize} />}
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
        icon={<LinkIcon className={iconSize} />}
        className={`${buttonClasses} ${
          editor.isActive('link') ? activeClasses : ''
        }`}
      />

      <ToolbarButton
        title="Emoji"
        onClick={onEmojiClick}
        icon={<SmileIcon className={iconSize} />}
        className={buttonClasses}
      />
    </div>
  )
}

const ToolbarButton = ({ onClick, icon, className, title }) => (
  <button type="button" onClick={onClick} className={className} title={title}>
    {icon}
  </button>
)

export default EditorToolbar
