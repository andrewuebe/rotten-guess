'use client'
import LobbyAuthenticated from './LobbyAuthenticated';
import LobbyUnauthenticated from './LobbyUnauthenticated';
import { useAuth } from '@/app/contexts/AuthContext';
import { useLobby } from '@/utilities/hooks/useLobby';

export default function Lobby() {
  const { authToken, isAuthLoading } = useAuth();
  const lobby = useLobby();

  if ((isAuthLoading || authToken) && lobby.isLoading) {
    return <div>Loading...</div>
  }
  if (lobby.data) {
    return <LobbyAuthenticated />;
  }
  return <LobbyUnauthenticated />;
}

