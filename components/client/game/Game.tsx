import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { Game, GameStatus, RoundStatus } from "@/utilities/types/Game";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import GamePicking from "./GamePicking";
import GameGuessing from "./GameGuessing";
import GameScores from "./GameScores";
import { Player } from "@/utilities/types/Player";
export default function Game() {
  const queryClient = useQueryClient();
  const gameData = queryClient.getQueryData<Game>(ReactQueryKeys.GAME);
  const playerData = queryClient.getQueryData<Player>(ReactQueryKeys.PLAYER);

  const currentRoundData = useMemo(() => {
    if (!gameData) return null;
    return gameData.rounds[gameData.current_round - 1];
  }, [gameData]);

  if (!playerData || !gameData) {
    return (
      <div>
        TODO: LOADING SCREEN
      </div>
    )
  }

  if (gameData?.status === GameStatus.FINISHED) {
    // Game finished
    return (
      <div>
        TODO: FINISHED GAME SCREEN
      </div>
    )
  }

  switch (currentRoundData?.round_status) {
    case RoundStatus.PICKING:
      return <GamePicking userPlayer={playerData} pickerPlayer={currentRoundData.picker_player} />
    case RoundStatus.GUESSING:
      return <GameGuessing />
    case RoundStatus.SCORES:
      return <GameScores />
    default:
      return null;
  }
}