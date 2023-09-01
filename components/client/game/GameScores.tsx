import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { getMovieById } from "@/utilities/services/movieService";
import { PlayerScore, Round, RoundType, } from "@/utilities/types/Game";
import { useQuery, useQueries } from "@tanstack/react-query";
import GameRoundTitle from "./GameRoundTitle";

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
        <GameRoundTitle title="Scores" />
        <div className="mb-3 text-center">
          <div className="text-lg font-bold">
            {pickedMovieData.data.movie.title}
          </div>
          has a rotten tomatoes score of...
          <div className="text-3xl font-bold">
            {pickedMovieData.data.movie.rt_score}
          </div>
        </div>
      </div>
      <div>
        {sortedRoundPoints.map((guess, index) => {
          return (
            <div
              key={guess.player_id}
              className="rounded-md border border-slate-100 p-3 mt-2"
            >
              {guess.name} guessed
              <div
                className="flex"
              >
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}