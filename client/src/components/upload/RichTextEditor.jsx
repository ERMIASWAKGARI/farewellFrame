import { BubbleMenu, EditorContent } from '@tiptap/react'
import EditorToolbar from './EditorToolbar'

const RichTextEditor = ({
  label,
  editor,
  onEmojiClick,
  minHeight,
  showTextAlign,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1">
        {label}
      </label>
      <div className="bg-white dark:bg-gray-700 rounded-lg border border-border">
        {editor && (
          <>
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <EditorToolbar
                editor={editor}
                onEmojiClick={onEmojiClick}
                showTextAlign={showTextAlign}
              />
            </BubbleMenu>
            <EditorContent
              editor={editor}
              className={`min-h-[${minHeight}] p-3`}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default RichTextEditor
