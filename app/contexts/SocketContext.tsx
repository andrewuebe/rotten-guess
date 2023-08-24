import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/app/contexts/AuthContext';
import { getApiUrl } from '@/utilities/helpers/generalHelpers';

const serverUrl = getApiUrl();

const SocketContext = createContext<Socket | undefined>(undefined);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const { authToken } = useAuth();

  useEffect(() => {
    if (authToken) {
      const newSocket = io(serverUrl, {
        auth: {
          token: authToken,
        },
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      }
    }
  }, [authToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
};