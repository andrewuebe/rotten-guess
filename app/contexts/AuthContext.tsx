'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { JwtToken } from '../../utilities/constants/APIConstants';

interface AuthContextType {
  authToken: string | null;
  saveAuthToken: (value: string | null) => void;
  isAuthLoading: boolean;
}

const initialAuthContext: AuthContextType = {
  authToken: null,
  saveAuthToken: () => { },
  isAuthLoading: true
}

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const saveAuthToken = (value: string | null) => {
    if (!value) localStorage.setItem(JwtToken.LOCAL_STORAGE_KEY, '')
    if (value) {
      console.log(value);
      localStorage.setItem(JwtToken.LOCAL_STORAGE_KEY, value);
    }
    setAuthToken(value);

  }

  useEffect(() => {
    const token = localStorage.getItem(JwtToken.LOCAL_STORAGE_KEY);
    if (token) {
      setAuthToken(token);
    }
    setIsAuthLoading(false);
  }, []);

  const value = {
    authToken,
    saveAuthToken,
    isAuthLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
