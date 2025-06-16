import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const user = useSelector((state) => state.auth.user)
  const isLoggedIn = Boolean(user)

  // Handle scroll for sticky navbar with shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Add smooth scroll behavior to the whole document
    document.documentElement.style.scrollBehavior = 'smooth'

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setMobileOpen((prev) => !prev)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileOpen])

  // Smooth scroll to anchor links
  const handleSmoothScroll = (e) => {
    // Only handle internal anchor links
    if (e.target.hash && e.target.pathname === window.location.pathname) {
      e.preventDefault()
      const target = document.querySelector(e.target.hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileOpen(false)
  }

  const baseLink =
    'relative text-sm md:text-base font-medium transition-all duration-300 px-1 pb-1 border-b-2 border-transparent'

  const activeClass = 'text-primary dark:text-primary border-primary'
  const hoverClass =
    'hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary'

  const navLinks = isLoggedIn
    ? [
        { to: '/', label: 'Home' },
        { to: '/upload', label: 'Upload Message' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/about', label: 'About' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/upload', label: 'Upload Message' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/about', label: 'About' },
      ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-background transition-all duration-300 px-4 py-3 z-50 ${
        scrolled ? 'shadow-md backdrop-blur-sm bg-opacity-90' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary dark:text-primary hover:opacity-90 transition-opacity"
          onClick={handleSmoothScroll}
        >
          FarewellFrame
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={handleSmoothScroll}
              className={({ isActive }) =>
                [
                  baseLink,
                  isActive
                    ? activeClass
                    : 'text-text-primary dark:text-text-secondary',
                  hoverClass,
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <div className="relative group">
              <button className="text-sm font-semibold hover:opacity-90 transition">
                Profile
              </button>
              {/* Simple dropdown on hover */}
              <div className="absolute right-0 mt-2 w-40 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleSmoothScroll}
                >
                  My Profile
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="block px-4 py-2 text-sm font-medium rounded-md bg-button text-text-primary 
             hover:bg-primary/90 transition-colors duration-200"
                onClick={handleSmoothScroll}
              >
                Login
              </Link>
            </div>
          )}

          <ThemeToggle />
        </div>

        {/* Hamburger (Mobile only) */}
        <button
          className="md:hidden z-60 relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Overlay when menu is open */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" />
      )}

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed right-4 top-16 z-50 bg-background dark:bg-gray-800 shadow-lg rounded-lg py-2 px-4 space-y-2 min-w-[12rem] transition-all duration-300"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={handleSmoothScroll}
              className={({ isActive }) =>
                [
                  'block px-3 py-2 rounded text-sm font-medium transition-colors',
                  isActive
                    ? 'text-primary dark:text-primary bg-gray-100 dark:bg-gray-700'
                    : 'text-text-primary dark:text-text-secondary',
                  'hover:bg-gray-200 dark:hover:bg-gray-600',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-1 border-t border-border">
            {isLoggedIn ? (
              <div className="mt-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleSmoothScroll}
                >
                  My Profile
                </Link>
                <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-2 space-y-1">
                <Link
                  to="/auth"
                  className="block px-4 py-2 text-sm font-medium rounded-md bg-button text-gray-900 dark:text-text-primary 
             hover:bg-primary/90 dark:hover:bg-primary/90 transition-colors duration-200"
                  onClick={handleSmoothScroll}
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          <div className="pt-1 border-t border-border">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
