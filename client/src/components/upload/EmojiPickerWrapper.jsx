import EmojiPicker from 'emoji-picker-react'
import { forwardRef } from 'react'

const EmojiPickerWrapper = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ show, position, onEmojiClick }, ref) => {
    if (!show) return null

    return (
      <div
        className="absolute z-50"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
      </div>
    )
  }
)

EmojiPickerWrapper.displayName = 'EmojiPickerWrapper'

export default EmojiPickerWrapper
