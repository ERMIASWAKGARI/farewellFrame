import { Menu, UserCircle2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const menuRef = useRef(null)
  const profileRef = useRef(null)

  const { user } = useSelector((state) => state.auth)
  const isLoggedIn = Boolean(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    document.documentElement.style.scrollBehavior = 'smooth'
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add this useEffect to handle scrolling after navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        // Small timeout to ensure page is rendered
        setTimeout(() => {
          const navbarHeight = document.querySelector('nav')?.offsetHeight || 70
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navbarHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }, 100)
      }
    }

    // Handle navigation from other routes using state
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          scrollToSectionWithOffset(id)
        }, 100)
      }
    }
  }, [location])

  const toggleMenu = () => setMobileOpen((prev) => !prev)
  const toggleProfile = () => setProfileOpen((prev) => !prev)

  const handleLogout = () => {
    dispatch(logout())
    setProfileOpen(false)
    setMobileOpen(false)
    navigate('/')
  }

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMobileOpen(false)
    }
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileOpen(false)
    }
  }

  useEffect(() => {
    if (mobileOpen || profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen, profileOpen])

  // Navbar.jsx
  const scrollToSection = (id) => {
    // If we're not on the home page, navigate there first with hash
    if (location.pathname !== '/') {
      navigate(`/#${id}`, { state: { scrollTo: id } }) // Add state to track section
      return
    }

    // If we're already on home page, scroll to section with navbar offset
    scrollToSectionWithOffset(id)
  }

  const scrollToSectionWithOffset = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 70
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    setMobileOpen(false)
  }

  const baseLink =
    'relative text-sm md:text-base font-medium transition-all duration-300 px-1 pb-1 border-b-2 border-transparent'
  const activeClass = 'text-primary dark:text-primary border-primary'
  const hoverClass =
    'hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary'

  const navLinks = [
    { to: '/', label: 'Home', isRoute: true },
    { to: '/upload', label: 'Upload Message', isRoute: true },
    { to: 'gallery', label: 'Gallery', isRoute: false },
    { to: 'about', label: 'About', isRoute: false },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-4 py-3 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md backdrop-blur-sm bg-opacity-95' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary hover:opacity-90"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          FarewellFrame
        </Link>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label, isRoute }) =>
            isRoute ? (
              // In your navLinks mapping
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  [
                    baseLink,
                    isActive
                      ? activeClass
                      : 'text-text-primary dark:text-text-secondary',
                    hoverClass,
                  ].join(' ')
                }
                onClick={(e) => {
                  if (location.pathname === '/' && to === '/') {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
              >
                {label}
              </NavLink>
            ) : (
              <button
                key={to}
                onClick={() => scrollToSection(to)}
                className={`${baseLink} text-text-primary dark:text-text-secondary ${hoverClass}`}
              >
                {label}
              </button>
            )
          )}

          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:opacity-90 transition"
                onClick={toggleProfile}
                aria-label="Open profile menu"
              >
                <UserCircle2 className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded shadow-lg bg-white dark:bg-gray-800 z-50 py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="block px-4 py-2 text-sm font-medium rounded-md bg-button text-text-primary hover:bg-primary/90 transition-colors duration-200"
            >
              Login
            </Link>
          )}

          <ThemeToggle />
        </div>
        {/* Mobile Hamburger */}
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

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" />
      )}

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed right-4 top-16 z-50 bg-background dark:bg-gray-800 shadow-lg rounded-lg py-2 px-4 space-y-2 min-w-[12rem] transition-all duration-300"
        >
          {navLinks.map(({ to, label, isRoute }) =>
            isRoute ? (
              // In your mobile navLinks mapping
              // In your mobile menu NavLink mapping
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={(e) => {
                  setMobileOpen(false) // Always close menu on click
                  if (location.pathname === '/' && to === '/') {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className={({ isActive }) =>
                  [
                    'block px-3 py-2 rounded text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary dark:text-primary bg-gray-100 dark:bg-gray-700'
                      : 'text-text-primary dark:text-text-secondary',
                    'hover:bg-gray-200 dark:hover:bg-gray-600',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ) : (
              // In your mobile menu button mapping
              <button
                key={to}
                onClick={() => {
                  setMobileOpen(false) // Close menu first
                  scrollToSection(to) // Then handle scroll
                }}
                className="block w-full text-left px-3 py-2 rounded text-sm font-medium text-text-primary dark:text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {label}
              </button>
            )
          )}

          <div className="pt-2 border-t border-border">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-sm text-text-primary dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => setMobileOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 text-sm font-medium rounded-md bg-button text-text-primary hover:bg-primary/90 transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>

          <div className="pt-2 border-t border-border">
            <div onClick={() => setMobileOpen(false)}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
