import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import AuthPage from './pages/Authentication'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPass'
import VerifyEmail from './pages/VerifyEmail'

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
          <Toast />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />

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
