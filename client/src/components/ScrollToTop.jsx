// components/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0)
    }
    // Else scroll to element with offset for navbar
    else {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 70
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight

        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }, 100)
      }
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
