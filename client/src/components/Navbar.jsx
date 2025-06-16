// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Farewell Frame
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <Link
            to="/upload"
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            Upload Message
          </Link>
          <Link
            to="/gallery"
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            About
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
