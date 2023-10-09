import { GamePlayer, RoundType, Pick, Guess, Round } from "@/utilities/types/Game";
import { Player } from "@/utilities/types/Player";
import MovieOption from "../movie/MovieOption";
import { ReactQueryKeys } from "@/utilities/constants/ReactQuery";
import { getMovieById, getMovieDetails } from "@/utilities/services/movieService";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useGame } from "@/utilities/hooks/useGame";
import MovieDetails from "../movie/MovieDetails";
import ScorePicker from "../pickers/ScorePicker";
import GameRoundHeader from "./GameRoundHeader";
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface GameGuessingProps {
  currentRound: Round;
  pickerPlayer: GamePlayer;
  userPlayer: Player | undefined;
  pick: Pick;
  roundType: RoundType;
}

export default function GameGuessing({ currentRound, pickerPlayer, userPlayer, pick, roundType }: GameGuessingProps) {
  const isUserPickerPlayer = userPlayer?.name === pickerPlayer.name
  const { data: pickedMovieData } = useQuery([...ReactQueryKeys.MOVIE, pick.movie_id], () => getMovieById(pick.movie_id), {
    enabled: (roundType === RoundType.GUESS_SCORE && !!pick.movie_id)
  });

  const { roundEndGuessing } = useGame();

  const [parent] = useAutoAnimate();

  const [selectedMovie, setSelectedMovie] = useState<any>(null)

  const hasUserGuessed = useMemo(() => currentRound.guesses.some((guess: Guess) => guess.name === userPlayer?.name), [currentRound]);

  const getMoreDetailsForSelectedMovie = async (movie: any) => {
    const getMovieDetailsResponse = await getMovieDetails(movie.title, movie.year);
    if (!getMovieDetailsResponse) return;
    const { backdropPath: movieBackdropPath, overview } = getMovieDetailsResponse;
    const movieBackdropUrl = `https://image.tmdb.org/t/p/original/${movieBackdropPath}`;
    setSelectedMovie({ ...movie, backdropUrl: movieBackdropUrl, overview });
  }

  const handleMovieOptionClick = (movie: any) => {
    setSelectedMovie(movie);
    getMoreDetailsForSelectedMovie(movie);
  }

  const removeSelectedMovie = () => {
    setSelectedMovie(null);
  }

  const handleScoreSelect = async (score: number) => {
    console.log(score);
    const scoreGuess: Guess = {
      name: userPlayer?.name as string,
      guess: score.toString(),
      round_type: RoundType.GUESS_SCORE
    }
    roundEndGuessing(scoreGuess);
  };

  if (!pickedMovieData) return null;

  if (hasUserGuessed) {
    return (
      <div>
        Thanks for guessing!
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>Guess the movie’s Rotten Tomatoes score</h2>
        <div className="p-4 mt-6 mb-4 bg-slate-100">
          <h4 className="">
            {isUserPickerPlayer ? 'You picked' : `${pickerPlayer.name} picked`}
          </h4>
          <MovieOption movie={pickedMovieData?.data.movie} handleMovieOptionClick={handleMovieOptionClick} />
        </div>
        <div>
          <h5 className="uppercase font-light text-xs mb-2">What percentage of {pickedMovieData.data.movie.title}’s reviews are positive?</h5>
          <ScorePicker onScoreSelect={handleScoreSelect} />
        </div>
      </div>
      <div className="w-full h-screen">
        <div className="bg-rose-600 h-full">
          <div className="mb-4">
            <GameRoundHeader title="Guess" subTitle={`Now that ${isUserPickerPlayer ? 'you picked' : `${pickerPlayer.name} picked`} the movie ${pickedMovieData?.data?.movie?.title}, guess what its rotten tomatoes score is!`} />
          </div>
          <div className="max-w-[750px] m-auto px-2">
            <div className="rounded-md bg-rose-100 shadow" ref={parent}>
              {selectedMovie && (
                <MovieDetails
                  selectedMovie={selectedMovie}
                  closeButton={removeSelectedMovie}
                />
              )}
              {!selectedMovie && (
                <div className="p-4">
                  <h4 className="font-montserrat p-2">
                    {isUserPickerPlayer ? 'You picked' : `${pickerPlayer.name} picked`}
                  </h4>
                  <MovieOption movie={pickedMovieData?.data.movie} handleMovieOptionClick={handleMovieOptionClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}