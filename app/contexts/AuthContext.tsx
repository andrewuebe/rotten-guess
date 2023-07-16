'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { JwtToken } from '../utilities/constants/APIConstants';
import { getLobby } from '../utilities/services/lobbyService';
import { Lobby } from '../utilities/types/Lobby';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (value: string | null) => void;
  lobbyInfo: Lobby | null;
  setLobbyInfo: (value: Lobby | null) => void;
}

const initialAuthContext: AuthContextType = {
  authToken: null,
  setAuthToken: () => { },
  lobbyInfo: null,
  setLobbyInfo: () => { }
}

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const hasFetchedLobby = useRef(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [lobbyInfo, setLobbyInfo] = useState<Lobby | null>(null);

  const getLobbyFromServer = async () => {
    const lobbyResponse = await getLobby();
    if (lobbyResponse?.data) {
      setLobbyInfo(lobbyResponse.data.lobby);
      hasFetchedLobby.current = true;
    }
  }

  useEffect(() => {
    if (authToken && !hasFetchedLobby.current && !lobbyInfo) {
      getLobbyFromServer();
    }
  }, [authToken]);

  useEffect(() => {
    const token = localStorage.getItem(JwtToken.LOCAL_STORAGE_KEY);
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const value = {
    authToken,
    setAuthToken,
    lobbyInfo,
    setLobbyInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
