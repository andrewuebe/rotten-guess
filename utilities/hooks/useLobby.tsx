import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryObserverBaseResult } from "@tanstack/query-core/src/types"
import { getLobby, joinLobbyByToken, createLobby } from "../services/lobbyService";
import { useAuth } from "@/app/contexts/AuthContext";
import { ReactQueryKeys } from "../constants/ReactQuery";
import { GetLobbyResponse, JoinCreateLobbyResponse, Lobby } from "../types/Lobby";
import { Player } from "../types/Player";

interface UseLobbyReturn extends QueryObserverBaseResult {
  join: (lobbyToken: string, playerName?: string) => Promise<Lobby | null>;
  createNew: () => Promise<Lobby | null>;
  addPlayer: (name: string, id: string) => void;
}

/**
 * 
 * @returns 
 */
export function useLobby(): UseLobbyReturn {
  const { authToken, saveAuthToken } = useAuth();
  const queryClient = useQueryClient();


  const lobby = useQuery(
    ReactQueryKeys.LOBBY,
    async () => {
      const getLobbyResponse: GetLobbyResponse = await getLobby();
      if (getLobbyResponse?.data) {
        queryClient.setQueryData(ReactQueryKeys.PLAYER, getLobbyResponse.data.player);
        return getLobbyResponse.data.lobby;
      }
    },
    {
      enabled: !!authToken
    }
  );

  const join = async (lobbyToken: string, playerName?: string) => {
    const joinLobbyByTokenResponse: JoinCreateLobbyResponse = await joinLobbyByToken(lobbyToken, playerName);
    if (joinLobbyByTokenResponse?.data) {
      queryClient.setQueryData(ReactQueryKeys.PLAYER, joinLobbyByTokenResponse?.data.player);
      queryClient.setQueryData(ReactQueryKeys.LOBBY, joinLobbyByTokenResponse?.data.lobby);
      saveAuthToken(joinLobbyByTokenResponse?.data.token);
      return joinLobbyByTokenResponse?.data.lobby as Lobby;
    } else {
      return null;
    }
  }

  const createNew = async () => {
    const createLobbyResponse: JoinCreateLobbyResponse = await createLobby();
    if (createLobbyResponse) {
      const { lobby, token } = createLobbyResponse.data;
      saveAuthToken(token);
      queryClient.setQueryData(ReactQueryKeys.LOBBY, lobby);
      return lobby;
    } else {
      return null;
    }
  }

  const addPlayer = (name: string, id: string) => {
    const lobby = queryClient.getQueryData(ReactQueryKeys.LOBBY);
    if (!lobby) {
      queryClient.invalidateQueries(ReactQueryKeys.LOBBY);
    } else {
      queryClient.setQueryData(ReactQueryKeys.LOBBY, (oldData: any) => {
        const playerExists = oldData.players.some((player: Player) => player.name === name && player.id === id);

        if (!playerExists) {
          return {
            ...oldData,
            players: [
              ...oldData.players,
              {
                name,
                id
              }
            ]
          }
        } else {
          return oldData;
        }
      })
    }
  }


  return {
    ...lobby,
    join,
    createNew,
    addPlayer
  } as UseLobbyReturn
}