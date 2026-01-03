import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">

          {/* Spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>

          {/* Text */}
          <p className="text-lg">Loading...</p>

        </div>
      </div>
    );
  }


  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-2 flex items-center justify-center">Access Denied</h1>
          <p className="text-lg">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }
  return children;
}

export default ProtectedRoute
