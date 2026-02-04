import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from './api';
import { auth } from './auth';

type Props = {
  children: ReactNode;
};

export function AdminRoute({ children }: Props) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await api.me();
        setOk(me.role === 'admin');
      } catch {
        auth.clear();
        setOk(false);
      }
    })();
  }, []);

  if (ok === null) return null;
  if (!ok) return <Navigate to="/profile" replace />;

  return <>{children}</>;
}
