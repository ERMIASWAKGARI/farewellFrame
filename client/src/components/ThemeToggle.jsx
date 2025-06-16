// src/components/ThemeToggle.jsx
import { Moon, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/theme/themeSlice'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.theme.mode)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
      aria-label="Toggle Theme"
    >
      <div className="transition-transform duration-500 ease-in-out transform hover:rotate-180">
        {mode === 'dark' ? (
          <Sun className="w-5 h-5 text-primary" />
        ) : (
          <Moon className="w-5 h-5 text-gray-800" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
