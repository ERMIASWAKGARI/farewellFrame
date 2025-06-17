// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../features/toast/toastSlice'

const toastVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
}

const Toast = () => {
  const dispatch = useDispatch()
  const { message, type, visible } = useSelector((state) => state.toast)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, dispatch])

  const getColorStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600'
      case 'error':
        return 'bg-red-500 border-red-600'
      case 'info':
        return 'bg-blue-500 border-blue-600'
      case 'warning':
        return 'bg-yellow-400 text-black border-yellow-500'
      default:
        return 'bg-gray-800 border-gray-700'
    }
  }

  return (
    <div className="fixed top-6 right-6 z-[9999] space-y-3">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={toastVariants}
            transition={{ duration: 0.3 }}
            role="alert"
            className={`px-5 py-4 rounded-xl border shadow-lg text-white font-medium w-80 backdrop-blur-md bg-opacity-90 ${getColorStyles()}`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex-1">{message}</span>
              <button
                onClick={() => dispatch(hideToast())}
                className="p-1 text-white hover:opacity-80 shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Toast
