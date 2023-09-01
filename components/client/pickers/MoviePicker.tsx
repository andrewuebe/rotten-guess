import { useEffect, useState, useCallback } from "react";
import { debounce } from "@/utilities/helpers/generalHelpers";
import { getMovieDetails, searchMovies as searchMoviesInDb } from "@/utilities/services/movieService";
import TextInput from "../inputs/TextInput";
import RatingTag from "../movie/RatingTag";
import { getOverviewExcerpt } from "@/utilities/helpers/movieHelper";
import Button from "../buttons/Button";
import MovieOption from "../movie/MovieOption";
import MovieDetails from "../movie/MovieDetails";

interface MoviePickerProps {
  onPick: (movie: any) => void;
}

export default function MoviePicker({ onPick }: MoviePickerProps) {
  const [inputVal, setInputVal] = useState<string>('');
  const [debouncedVal, setDebouncedVal] = useState<string>('');

  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const debouncedHandleChange = useCallback(
    debounce((value: string) => {
      setDebouncedVal(value);
    }, 666),
    []
  );

  const handleInputChange = (value: string) => {
    setInputVal(value);
    debouncedHandleChange(value);
  }

  const searchMovies = async (query: string) => {
    const response = await searchMoviesInDb(query);
    setMovieResults(response.data.movies);
  }

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

  useEffect(() => {
    if (debouncedVal) {
      console.log(`Fetch the movies for search value: ${debouncedVal}`);
      searchMovies(debouncedVal)
    }
  }, [debouncedVal]);

  if (selectedMovie) {
    return (
      <div>
        <MovieDetails
          selectedMovie={selectedMovie}
          primaryButton={onPick}
          closeButton={removeSelectedMovie}
        />
      </div >
    )
  }

  return (
    <div>
      <TextInput
        value={inputVal}
        onChange={handleInputChange}
        placeholder="Pick a movie"
        type="text"
      />
      {movieResults.length > 0 && (
        <div className="p-4 mt-6 mb-2 bg-slate-100">
          {movieResults.map((movie) => (
            <div
              key={`${movie.title}-${movie.year}`}
            >
              <MovieOption movie={movie} handleMovieOptionClick={handleMovieOptionClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
