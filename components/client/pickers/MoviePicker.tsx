import { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "@/utilities/helpers/generalHelpers";
import { getMovieDetails, searchMovies as searchMoviesInDb } from "@/utilities/services/movieService";
import TextInput from "../inputs/TextInput";
import MovieOption from "../movie/MovieOption";
import MovieDetails from "../movie/MovieDetails";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import autoAnimate from '@formkit/auto-animate';
import { useAutoAnimate } from '@formkit/auto-animate/react'


interface MoviePickerProps {
  onPick: (movie: any) => void;
}

export default function MoviePicker({ onPick }: MoviePickerProps) {
  const [inputVal, setInputVal] = useState<string>('');
  const [debouncedVal, setDebouncedVal] = useState<string>('');

  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const parent = useRef(null);
  const [listParent] = useAutoAnimate();
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

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent])

  return (
    <div className="max-w-[750px] m-auto px-2">
      <div className="rounded-md bg-rose-100 shadow" ref={parent}>
        {!selectedMovie && (
          <>
            <div className={`flex justify-start items-center border-b-rose-200 p-4 ${movieResults.length > 0 ? 'border-b-2' : 'border-b-0'}`}>
              {/* input area */}
              <div className="text-rose-400 mr-2">
                <MagnifyingGlassIcon width="35" height="35" />
              </div>
              <TextInput
                value={inputVal}
                onChange={handleInputChange}
                placeholder="Movie name..."
                type="text"
                variant="transparent"
                className="text-rose-900 placeholder:text-rose-400"
              />
            </div>
            {movieResults.length > 0 && (
              <ul className="px-4 mt-4 mb-2" ref={listParent}>
                {movieResults.map((movie) => (
                  <li
                    key={`${movie.title}-${movie.year}`}
                  >
                    <MovieOption movie={movie} handleMovieOptionClick={handleMovieOptionClick} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {selectedMovie && (
          <div>
            <MovieDetails
              selectedMovie={selectedMovie}
              primaryButton={onPick}
              closeButton={removeSelectedMovie}
            />
          </div >
        )}
      </div>
    </div>
  );
}
