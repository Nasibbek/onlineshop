import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAppContext()
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute
