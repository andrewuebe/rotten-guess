import { PlayerScore } from "@/utilities/types/Game";
import GameLeaderboardTable from "./GameLeaderboardTable";
import { colorScoreMap } from "@/utilities/helpers/gameHelper";

interface GameLeaderboardProps {
  playerScores: PlayerScore[];
};

export default function GameLeaderboard({ playerScores }: GameLeaderboardProps) {
  const highestScore = playerScores.reduce((prev, current) => (prev.score > current.score) ? prev : current);

  return (
    <div>
      {playerScores.map((playerScore: PlayerScore, index: number) => (
        <div key={playerScore.name + index}>
          <GameLeaderboardTable columnOne={playerScore.name} columnTwo={playerScore.score.toString()} color={colorScoreMap(playerScore.score, highestScore.score)} />
        </div>
      ))}
    </div>
  )
}