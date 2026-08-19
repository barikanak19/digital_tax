import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Wraps a route so it requires authentication (and optionally the
 * 'admin' role). Frontend gating is a UX convenience only — the
 * backend independently enforces authorization on every protected
 * endpoint via authenticateToken/requireAdmin middleware.
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to={requireAdmin ? '/admin/login' : '/login'} state={{ from: location.pathname }} replace />;
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
