import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
  const mode = useSelector((state) => state.theme.mode)

  useEffect(() => {
    // Apply theme class immediately
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  // Add initial theme application
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      const root = document.documentElement
      if (storedTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [])

  return (
    <Router>
      <div className="bg-background dark:bg-background min-h-screen text-primary dark:text-primary transition-colors duration-500">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Hero />} />
            {/* Add other routes here */}
            {/* <Route path="/upload" element={<Upload />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
