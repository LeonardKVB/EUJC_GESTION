import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('eujc_token');
    if (token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: any) => {
    const res = await axiosInstance.post('/auth/login', credentials);
    const { token, user: userData } = res.data.data;
    localStorage.setItem('eujc_token', token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('eujc_token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
