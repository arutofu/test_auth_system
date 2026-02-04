import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { auth } from './auth';

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const token = auth.getToken();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
