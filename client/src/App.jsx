import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import AuthPage from './pages/Authentication'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home' // Add this line at the top
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPass'
import Upload from './pages/Upload'
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
      <div className="bg-background dark:bg-background min-h-screen text-primary dark:text-primary transition-colors duration-500 ">
        {' '}
        <Navbar />
        <div className="pt-16 p-4">
          <Toast />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
