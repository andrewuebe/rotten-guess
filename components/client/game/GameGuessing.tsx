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
import PlayerColorCircle from "../players/PlayerColorCircle";
import { useAutoAnimate } from '@formkit/auto-animate/react';


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

  const { roundEndGuessing, data } = useGame();

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
        <div className="">Round {data.current_round}</div>
        <h1 className="pb-4 text-eggplant-800 font-rokkitt font-black text-5xl sm:text-6xl leading-[50px] sm:leading-[65px] max-w-[75%] sm:max-w-[450px]">
          Waiting...
        </h1>
        <p className="mt-6">
          Thanks for guessing, now you wait for everyone else to submit their guess.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="">Round {data.current_round}</div>
      <h1 className="pb-4 text-eggplant-800 font-rokkitt font-black text-5xl sm:text-6xl leading-[50px] sm:leading-[65px] max-w-[75%] sm:max-w-[450px]">
        Guess
      </h1>
      <p className="pb-6">
        Now that {isUserPickerPlayer ? 'you picked' : `${pickerPlayer.name} picked`} the movie {pickedMovieData?.data?.movie?.title}, guess what its rotten tomatoes score is!
      </p>
      <div className="flex justify-start mb-2 space-x-1 items-center">
        <PlayerColorCircle playerArray={data.player_scores} playerName={pickerPlayer?.name as string} isCurrentPlayer={isUserPickerPlayer} />
        <span>picked:</span>
      </div>
      <div className="rounded-md bg-corn-soup-200 shadow" ref={parent}>
        {selectedMovie && (
          <MovieDetails
            selectedMovie={selectedMovie}
            closeButton={removeSelectedMovie}
          />
        )}
        {!selectedMovie && (
          <div className="p-4">
            <MovieOption movie={pickedMovieData?.data.movie} handleMovieOptionClick={handleMovieOptionClick} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h5 className="uppercase font-light text-xs mb-2 text-slate-50">What percentage of {pickedMovieData.data.movie.title}’s reviews are positive?</h5>
        <ScorePicker onScoreSelect={handleScoreSelect} />
      </div>
    </div>
  )
}