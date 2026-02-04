import { auth } from './auth';

const API = 'http://localhost:3000';

async function req<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  const token = auth.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...init, headers: { ...headers, ...(init.headers as any) } });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message ? JSON.stringify(data.message) : res.statusText);
  }
  return data as T;
}

export const api = {
  login: (email: string, password: string) =>
    req<{ access_token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  register: (email: string, password: string) =>
    req<{ access_token: string }>('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),

  me: () => req<{ id: number; email: string; role: 'admin' | 'user' }>('/me'),

  adminUsers: () =>
    req<Array<{ id: number; email: string; role: string; createdAt: string }>>('/admin/users'),
};
