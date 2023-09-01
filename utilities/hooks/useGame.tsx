import { QueryObserverBaseResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGame, startGame, endPicking, endGuessing } from "../services/gameService";
import { useAuth } from "@/app/contexts/AuthContext";
import { ReactQueryKeys } from "../constants/ReactQuery";
import { GetGameResponse, Game, Pick, UpdatedRoundResponse, Guess } from "../types/Game";
import { useLobby } from "./useLobby";
import { Lobby } from "../types/Lobby";
import { useEffect } from "react";

interface UseGameReturn extends QueryObserverBaseResult {
  start: () => Promise<Game | null>;
  roundEndPicking: (pick: Pick) => Promise<void>;
  roundEndGuessing: (guess: Guess) => Promise<void>;
  data: Game;
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

  const roundEndPicking = async (pick: Pick) => {
    const roundEndPickingResponse: UpdatedRoundResponse = await endPicking(pick);
    if (roundEndPickingResponse) {
      const updatedRound = roundEndPickingResponse.data.updatedRound;
      queryClient.setQueryData(ReactQueryKeys.GAME, (oldGame: any) => {
        const newRounds = [...oldGame.rounds];
        newRounds[oldGame.current_round - 1] = updatedRound;

        return {
          ...oldGame,
          rounds: newRounds
        };
      });
    }
  };

  const roundEndGuessing = async (guess: Guess) => {
    const roundEndGuessingResponse: UpdatedRoundResponse = await endGuessing(guess);
    if (roundEndGuessingResponse) {
      const updatedRound = roundEndGuessingResponse.data.updatedRound;
      queryClient.setQueryData(ReactQueryKeys.GAME, (oldGame: any) => {
        const newRounds = [...oldGame.rounds];
        newRounds[oldGame.current_round - 1] = updatedRound;

        return {
          ...oldGame,
          rounds: newRounds
        };
      });
    }
  };

  return {
    ...game,
    data: game.data as Game,
    start,
    roundEndPicking,
    roundEndGuessing
  }
}
