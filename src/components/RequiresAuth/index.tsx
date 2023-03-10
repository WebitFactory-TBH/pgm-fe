import { useUser } from '../../context/user';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAuthI extends React.PropsWithChildren {
  requiresAuth: boolean;
}

export default function RequireAuth({
  children,
  requiresAuth,
}: RequireAuthI): JSX.Element {
  const { user } = useUser();

  return !requiresAuth || !!user ? (
    (children as JSX.Element)
  ) : (
    <Navigate to="/login" replace />
  );
}
