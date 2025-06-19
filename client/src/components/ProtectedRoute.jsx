// components/ProtectedRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth)

  // Check if user is authenticated
  if (!token) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" replace />
  }

  // Render child routes if authenticated
  return <Outlet />
}

export default ProtectedRoute
