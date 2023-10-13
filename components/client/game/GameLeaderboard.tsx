import { PlayerScore } from "@/utilities/types/Game";
import GameLeaderboardTable from "./GameLeaderboardTable";

interface GameLeaderboardProps {
  playerScores: PlayerScore[];
};

export default function GameLeaderboard({ playerScores }: GameLeaderboardProps) {
  const highestScore = playerScores.reduce((prev, current) => (prev.score > current.score) ? prev : current);

  const colorScoreMap = (score: number) => {
    const scorePercentage = (score / highestScore.score) * 100;
    if (scorePercentage < 25) {
      return 'bg-rose-200';
    }
    if (scorePercentage < 50) {
      return 'bg-orange-200';
    }
    if (scorePercentage < 75) {
      return 'bg-yellow-200';
    }
    if (scorePercentage >= 90) {
      return 'bg-green-200';
    }
  }
  return (
    <div>
      {playerScores.map((playerScore: PlayerScore, index: number) => (
        <div key={playerScore.name + index}>
          <GameLeaderboardTable columnOne={playerScore.name} columnTwo={playerScore.score.toString()} color={colorScoreMap(playerScore.score)} />
        </div>
      ))}
    </div>
  )
}