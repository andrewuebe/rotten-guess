import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { getMovieById } from "@/utilities/services/movieService";
import { PlayerScore, Round, RoundType, } from "@/utilities/types/Game";
import { useQuery, useQueries } from "@tanstack/react-query";
import GameRoundHeader from "./GameRoundHeader";
import GameScoresMovieReveal from "./GameScoresMovieReveal";
import GameScoresTable from "./GameScoresTable";

interface GameScoresProps {
  currentRound: Round;
  playerScores: PlayerScore[];
};

export default function GameScores({ currentRound, playerScores }: GameScoresProps) {
  const { picker_player: pickerPlayer, round_type: roundType, guesses, pick } = currentRound;
  const { data: pickedMovieData } = useQuery([...ReactQueryKeys.MOVIE, pick.movie_id], () => getMovieById(pick.movie_id), {
    enabled: (roundType === RoundType.GUESS_SCORE && !!pick.movie_id)
  });

  const results = useQueries({
    queries: guesses.map(guess => ({
      queryKey: [...ReactQueryKeys.MOVIE, guess.guess],
      queryFn: () => getMovieById(guess.guess),
      enabled: (roundType === RoundType.GUESS_MOVIE && !!guess.guess)
    }))
  })

  const sortedRoundPoints = guesses.sort((a, b) => {
    const aPoints = a.points as number;
    const bPoints = b.points as number;
    return bPoints - aPoints;
  });

  if (!pickedMovieData) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="bg-rose-600">
        <GameRoundHeader title="Scores" />
        <GameScoresMovieReveal title={pickedMovieData.data.movie.title} rt_score={pickedMovieData.data.movie.rt_score} rt_url={pickedMovieData.data.movie.url} />
      </div>
      <div className="max-w-[750px] m-auto p-4">
        <GameScoresTable
          columnOne="Player"
          columnTwo="Guess"
          columnThree="Points"
        />
        {sortedRoundPoints.map((guess, index) => {
          return (
            <GameScoresTable
              key={`${guess.player_id}-${index + 1}`}
              columnOne={guess.name}
              columnTwo={guess.guess}
              columnThree={Math.round(guess.points)?.toString() ?? 'N/A'}
              color="bg-rose-200"
            />
          )
        })}
      </div>
    </div>
  )
}