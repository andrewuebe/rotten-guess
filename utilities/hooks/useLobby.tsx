import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryObserverBaseResult } from "@tanstack/query-core/src/types"
import { getLobby, joinLobbyByToken, createLobby, leaveLobby } from "../services/lobbyService";
import { useAuth } from "@/app/contexts/AuthContext";
import { ReactQueryKeys } from "../constants/ReactQuery";
import { GetLobbyResponse, JoinCreateLobbyResponse, Lobby } from "../types/Lobby";
import { Player } from "../types/Player";
import { useEffect, useState } from "react";

export interface UseLobbyReturn extends QueryObserverBaseResult {
  data: Lobby | undefined;
  join: (lobbyToken: string, playerName?: string) => Promise<Lobby | null>;
  createNew: () => Promise<Lobby | null>;
  addPlayer: (name: string, id: string) => void;
  leave: () => Promise<boolean>;
}

/**
 * 
 * @returns 
 */
export function useLobby(): UseLobbyReturn {
  const { authToken, saveAuthToken } = useAuth();
  const queryClient = useQueryClient();


  const lobby = useQuery<Lobby>(
    ReactQueryKeys.LOBBY,
    async () => {
      const getLobbyResponse: GetLobbyResponse = await getLobby();
      if (!getLobbyResponse?.data) {
        throw new Error("Lobby not found");
      }
      queryClient.setQueryData(ReactQueryKeys.PLAYER, getLobbyResponse.data.player);
      return getLobbyResponse.data.lobby;
    },
    {
      enabled: !!authToken,
      retry: false
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
    const lobby = queryClient.getQueryData<Lobby>(ReactQueryKeys.LOBBY); // Explicitly type the result of getQueryData
    if (!lobby) {
      queryClient.invalidateQueries(ReactQueryKeys.LOBBY);
    } else {
      queryClient.setQueryData(ReactQueryKeys.LOBBY, (oldData: Lobby | undefined) => {
        if (!oldData) return oldData; // Additional check for oldData

        const playerExists = oldData.players?.some((player: Player) => player.name === name && player.id === id);

        if (!playerExists) {
          const newPlayers = [...(oldData.players || []), { name, id }];
          return { ...oldData, players: newPlayers };
        }

        return oldData;
      });
    }
  };

  const leave = async (): Promise<boolean> => {
    const leaveLobbyResponse = await leaveLobby();
    if (leaveLobbyResponse) {
      queryClient.setQueryData(ReactQueryKeys.LOBBY, null);
      queryClient.setQueryData(ReactQueryKeys.PLAYER, null);
      queryClient.setQueryData(ReactQueryKeys.GAME, null);
      return true;
    }
    return false;
  }

  const playerChangeName = async (newName: string): Promise<boolean> => {
    const nameChangeResponse = await changePlayerName(newName);
    if (nameChangeResponse) {
      queryClient.setQueryData(ReactQueryKeys.PLAYER, nameChangeResponse.data.player);
      return true;
    }
    return false;
  }

  return {
    ...lobby,
    data: lobby.data,
    join,
    createNew,
    addPlayer,
    leave,
  } as UseLobbyReturn
}