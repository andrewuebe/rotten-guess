import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { Game, GameStatus, RoundStatus } from "@/utilities/types/Game";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import GamePicking from "./GamePicking";
import GameGuessing from "./GameGuessing";
import GameScores from "./GameScores";
import { Player } from "@/utilities/types/Player";
import GameTimer from "./GameTimer";
import { endPicking } from "@/utilities/services/gameService"
import { useGame } from "@/utilities/hooks/useGame";

export default function Game() {
  const queryClient = useQueryClient();
  const playerData = queryClient.getQueryData<Player>(ReactQueryKeys.PLAYER);
  const game = useGame();

  const currentRoundData = useMemo(() => {
    if (!game.data) return null;
    return game.data.rounds[game.data.current_round - 1];
  }, [game.data]);

  const handleTimerEnd = async () => {
    console.log('timer ended');
    console.log('currentRoundData', currentRoundData);
    if (currentRoundData?.round_status === RoundStatus.PICKING) {
      game.roundEndPicking({ timed_out: true });
    }
    if (currentRoundData?.round_status === RoundStatus.GUESSING) {
      game.roundEndGuessing({ player_id: playerData?.id, name: playerData?.name as string, timed_out: true });
    }
  }

  const roundStatusComponent = useMemo(() => {
    console.log(currentRoundData);
    switch (currentRoundData?.round_status) {
      case RoundStatus.PICKING:
        return <GamePicking userPlayer={playerData} pickerPlayer={currentRoundData.picker_player} />
      case RoundStatus.GUESSING:
        return <GameGuessing currentRound={currentRoundData} userPlayer={playerData} pickerPlayer={currentRoundData.picker_player} pick={currentRoundData?.pick} roundType={currentRoundData?.round_type} />
      case RoundStatus.SCORES:
        return <GameScores currentRound={currentRoundData} playerScores={game.data.player_scores} />
      default:
        return null;
    }
  }, [currentRoundData]);

  if (!playerData || !game.data) {
    return (
      <div>
        TODO: LOADING SCREEN
      </div>
    )
  }

  if (game.data?.status === GameStatus.FINISHED) {
    // Game finished
    return (
      <div>
        TODO: FINISHED GAME SCREEN
      </div>
    )
  }

  return (
    <div>
      <GameTimer
        date={currentRoundData?.end_times[currentRoundData?.round_status]}
        onTimeUp={handleTimerEnd}
      />
      {roundStatusComponent}
    </div>
  )
}