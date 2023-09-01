import { useEffect } from 'react';
import { useLobby } from './useLobby';
import { useSocket } from '../../app/contexts/SocketContext';
import { Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { ReactQueryKeys } from '../constants/ReactQuery';
import { Lobby } from '../types/Lobby';

interface UseSocketReturn {
  socket: Socket | undefined;
}

const useSocketLogic = (): UseSocketReturn => {
  const socket = useSocket();
  const { addPlayer } = useLobby();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket) {
      // Listen for 'user-connected' event
      socket.on('user-connected', (data) => {
        console.log('user-connected', data);
        addPlayer(data.name, data.id);
      });

      socket.on('game-started', (data) => {
        queryClient.setQueryData(ReactQueryKeys.GAME, ({
          ...data
        }));
        queryClient.setQueryData(ReactQueryKeys.LOBBY, (oldLobbyData: any) => ({
          ...oldLobbyData,
          is_in_game: true,
        }))
      })

      socket.on('picking-end', (data) => {
        queryClient.setQueryData(ReactQueryKeys.GAME, (oldGame: any) => {
          console.log('data', data);
          const newRounds = [...oldGame.rounds];
          newRounds[oldGame.current_round - 1] = data.updatedRound;

          return {
            ...oldGame,
            rounds: newRounds
          };
        });
      })

      socket.on('guessing-end', (data) => {
        queryClient.setQueryData(ReactQueryKeys.GAME, (oldGame: any) => {
          console.log('data', data);
          const newRounds = [...oldGame.rounds];
          newRounds[oldGame.current_round - 1] = data.updatedRound;

          return {
            ...oldGame,
            rounds: newRounds
          };
        });
      })

      // Add other listeners here
    }
    // The function returned by useEffect runs when the component unmounts, 
    // remove listeners here to avoid memory leaks
    return () => {
      if (socket) {
        socket.off('user-connected');
      }
    };
  }, [socket]);

  return {
    socket,
  };
};

export default useSocketLogic;
