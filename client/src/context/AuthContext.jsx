import { createContext, useContext, useState, useEffect } from 'react';
import apiFetch from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // checking stored token on mount

  // On app load — restore user from stored token
  useEffect(() => {
    const token = localStorage.getItem('roamly_token');
    if (!token) {
      setLoading(false);
      return;
    }
    apiFetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.user))
      .catch(() => localStorage.removeItem('roamly_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('roamly_token', res.token);
    setUser(res.user);
    return res.user;
  };

  const register = async (name, email, password) => {
    const res = await apiFetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    localStorage.setItem('roamly_token', res.token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem('roamly_token');
    setUser(null);
  };

  const getToken = () => localStorage.getItem('roamly_token');

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, isAdmin, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
