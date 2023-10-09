import RatingTag from "./RatingTag"

export default function MovieOption({ movie, handleMovieOptionClick }: { movie: any, handleMovieOptionClick?: (movie: any) => void }) {
  return (
    <button
      type="button"
      key={`${movie.title}-${movie.year}`}
      className='appearance-none m-0 mb-2 px-2 py-3 min-h-0 min-w-0 text-left w-full hover:bg-rose-200 focus:bg-rose-200 focus:outline-none focus:shadow-outline cursor-pointer rounded-md'
      onClick={() => {
        if (handleMovieOptionClick) {
          handleMovieOptionClick(movie)
        }
      }}
    >
      <h3 className="font-bold">{movie.title} <span className="font-light">({movie.year})</span></h3>
      <div className="text-sm">
        <RatingTag rating={movie.rating} />
        {movie.genre.map((genre: string, index: number) => (
          <span key={`${genre}-${index + 1}`} className={(index < movie.genre.length - 1) ? 'mr-1' : ''}>
            {genre}
            {index < movie.genre.length - 1 && ','}
          </span>
        ))}
      </div>
    </button>
  )
}