import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'
import AuthPage from './pages/Authentication'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPass'
import Upload from './pages/Upload'
import VerifyEmail from './pages/VerifyEmail'

function App() {
  const mode = useSelector((state) => state.theme.mode)

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-background min-h-screen text-primary dark:text-primary transition-colors duration-500">
        <Navbar />
        <div className="pt-16 p-4">
          <Toast />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/upload" element={<Upload />} />
              {/* Add more protected routes here */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
