import ApiService from './axiosService';
import { getApiUrl } from '../helpers/generalHelpers';

const movieService = new ApiService({ baseUrl: getApiUrl() });
const theMovieDbService = new ApiService(
  {
    baseUrl: 'https://api.themoviedb.org/3',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${process.env.THE_MOVIE_DB_API_KEY}`
    }
  }
);

export const searchMovies = async (query: string) => {
  try {
    const searchMoviesResponse = await movieService.get(`/movie/search?query=${query}`);
    return searchMoviesResponse.data;
  } catch (error) {
    console.log(error);
  }
}

export const getMovieDetails = async (movieTitle: string, movieYear: string) => {
  try {
    const movieQueryNoSpaces = movieTitle.replace(/\s/g, '%20');
    const movieDBSearchResponse = await theMovieDbService.get(`/search/movie?query=${movieQueryNoSpaces}&year=${movieYear}&include_adult=false&language=en-US&page=1`);
    const movieMatch = movieDBSearchResponse.data.results[0];
    console.log(movieMatch);
    return {
      backdropPath: movieMatch.backdrop_path ?? null,
      overview: movieMatch.overview ?? null
    };
  } catch (error) {
    console.log(error);
  }
}

export const getMovieById = async (movieId: string | undefined) => {
  if (!movieId) return null;

  try {
    console.log('here!');
    const movieResponse = await movieService.get(`/movie/${movieId}`);
    return movieResponse.data;
  } catch (error) {
    console.log(error);
  }
};