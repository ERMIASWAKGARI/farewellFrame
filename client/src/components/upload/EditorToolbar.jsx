const EditorToolbar = ({ editor, onEmojiClick, showTextAlign }) => (
  <div className="flex bg-white shadow-lg rounded-md p-1">
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
    >
      <span className="font-bold">B</span>
    </button>
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`p-1 rounded ${
        editor.isActive('italic') ? 'bg-gray-200' : ''
      }`}
    >
      <span className="italic">I</span>
    </button>
    <button
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={`p-1 rounded ${
        editor.isActive('underline') ? 'bg-gray-200' : ''
      }`}
    >
      <span className="underline">U</span>
    </button>

    {showTextAlign && (
      <>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1 rounded ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M3 14h18M3 18h18M3 6h18"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1 rounded ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M3 14h18M3 18h18M3 6h18"
            />
          </svg>
        </button>
      </>
    )}

    <button onClick={onEmojiClick} className="p-1 rounded">
      😊
    </button>
  </div>
)

export default EditorToolbar
