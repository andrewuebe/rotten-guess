import { QueryObserverBaseResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGame, startGame } from "../services/gameService";
import { useAuth } from "@/app/contexts/AuthContext";
import { ReactQueryKeys } from "../constants/ReactQuery";
import { GetGameResponse, Game } from "../types/Game";
import { useLobby } from "./useLobby";
import { Lobby } from "../types/Lobby";

interface UseGameReturn extends QueryObserverBaseResult {
  start: () => Promise<Game | null>;
}

/**
 * 
 * @returns 
 */
export function useGame(): UseGameReturn {
  const { authToken } = useAuth();
  const queryClient = useQueryClient();
  const lobbyData = queryClient.getQueryData<Lobby>(ReactQueryKeys.LOBBY);

  const game = useQuery(
    ReactQueryKeys.GAME,
    async () => {
      const getGameResponse: GetGameResponse = await getGame();
      if (getGameResponse?.data) {
        return getGameResponse.data;
      }
    },
    {
      enabled: (!!authToken && !!lobbyData?.is_in_game)
    }
  );

  const start = async () => {
    const startGameResponse: GetGameResponse = await startGame();
    if (startGameResponse) {
      const game = startGameResponse.data;
      queryClient.setQueryData(ReactQueryKeys.LOBBY, (oldLobby: any) => ({ ...oldLobby, is_in_game: true }));
      queryClient.setQueryData(ReactQueryKeys.GAME, game);
      return game;
    } else {
      return null;
    }
  }

  return {
    ...game,
    start
  }
}
